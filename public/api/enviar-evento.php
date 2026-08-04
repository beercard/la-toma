<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "message" => "Metodo no permitido"]);
  exit;
}

$raw = file_get_contents("php://input");
$payload = json_decode($raw ?: "{}", true);

if (!is_array($payload)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Payload invalido"]);
  exit;
}

$smtpHost = getenv("SMTP_HOST") ?: "";
$smtpPort = getenv("SMTP_PORT") ?: "";
$smtpUser = getenv("SMTP_USER") ?: "";
$smtpPass = getenv("SMTP_PASS") ?: "";
$mailTo = getenv("SALES_EMAIL_TO") ?: "";
$mailFrom = getenv("SALES_EMAIL_FROM") ?: "";

if ($smtpHost === "" || $smtpPort === "" || $smtpUser === "" || $smtpPass === "" || $mailTo === "" || $mailFrom === "") {
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => "Servidor sin configuracion de email"]);
  exit;
}

$fullName = trim((string)($payload["full_name"] ?? ""));
$company = trim((string)($payload["company"] ?? ""));
$email = trim((string)($payload["email"] ?? ""));
$phone = trim((string)($payload["phone"] ?? ""));
$eventType = trim((string)($payload["event_type"] ?? ""));
$branch = trim((string)($payload["branch"] ?? ""));
$date = trim((string)($payload["date"] ?? ""));
$time = trim((string)($payload["time"] ?? ""));
$guests = trim((string)($payload["guests"] ?? ""));
$comments = trim((string)($payload["comments"] ?? ""));
$adminSubject = trim((string)($payload["admin_subject"] ?? ""));
$adminHtml = (string)($payload["admin_html"] ?? "");
$clientSubject = trim((string)($payload["client_subject"] ?? ""));
$clientHtml = (string)($payload["client_html"] ?? "");

if ($fullName === "" || $email === "" || $phone === "" || $eventType === "" || $date === "" || $time === "" || $guests === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Faltan datos obligatorios"]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Email invalido"]);
  exit;
}

if ($adminSubject === "" || $adminHtml === "" || $clientSubject === "" || $clientHtml === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Falta plantilla de email"]);
  exit;
}

function readSmtpLine($socket): string {
  $line = "";
  while (!feof($socket)) {
    $part = fgets($socket, 515);
    if ($part === false) break;
    $line .= $part;
    if (strlen($part) < 4) break;
    if ($part[3] === " ") break;
  }
  return $line;
}

function smtpExpect($socket, array $okCodes): void {
  $line = readSmtpLine($socket);
  $code = (int)substr($line, 0, 3);
  if (!in_array($code, $okCodes, true)) {
    throw new RuntimeException("SMTP error: " . trim($line));
  }
}

function smtpSend($socket, string $command): void {
  fwrite($socket, $command . "\r\n");
}

function buildHeaders(string $from, string $to, string $subject, ?string $replyTo): string {
  $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
  $headers = [];
  $headers[] = "From: " . $from;
  $headers[] = "To: " . $to;
  $headers[] = "Subject: " . $encodedSubject;
  if ($replyTo) {
    $headers[] = "Reply-To: " . $replyTo;
  }
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-Type: text/html; charset=UTF-8";
  $headers[] = "Content-Transfer-Encoding: base64";
  return implode("\r\n", $headers);
}

function smtpSendMail(string $host, int $port, string $user, string $pass, string $from, string $to, string $subject, string $html, ?string $replyTo): void {
  $socket = stream_socket_client("ssl://" . $host . ":" . $port, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
  if ($socket === false) {
    throw new RuntimeException("No se pudo conectar al SMTP");
  }

  stream_set_timeout($socket, 20);

  smtpExpect($socket, [220]);
  smtpSend($socket, "EHLO latoma");
  smtpExpect($socket, [250]);
  smtpSend($socket, "AUTH LOGIN");
  smtpExpect($socket, [334]);
  smtpSend($socket, base64_encode($user));
  smtpExpect($socket, [334]);
  smtpSend($socket, base64_encode($pass));
  smtpExpect($socket, [235]);

  smtpSend($socket, "MAIL FROM:<" . $from . ">");
  smtpExpect($socket, [250]);
  smtpSend($socket, "RCPT TO:<" . $to . ">");
  smtpExpect($socket, [250, 251]);
  smtpSend($socket, "DATA");
  smtpExpect($socket, [354]);

  $encodedBody = chunk_split(base64_encode($html), 76, "\r\n");
  $headers = buildHeaders($from, $to, $subject, $replyTo);
  $message = $headers . "\r\n\r\n" . $encodedBody;
  $message = str_replace("\r\n.\r\n", "\r\n..\r\n", $message);

  fwrite($socket, $message . "\r\n.\r\n");
  smtpExpect($socket, [250]);
  smtpSend($socket, "QUIT");
  fclose($socket);
}

try {
  $smtpPortNumber = (int)$smtpPort;
  if ($smtpPortNumber <= 0) {
    throw new RuntimeException("Puerto SMTP invalido");
  }

  smtpSendMail($smtpHost, $smtpPortNumber, $smtpUser, $smtpPass, $mailFrom, $mailTo, $adminSubject, $adminHtml, $email);
  smtpSendMail($smtpHost, $smtpPortNumber, $smtpUser, $smtpPass, $mailFrom, $email, $clientSubject, $clientHtml, null);

  echo json_encode(["ok" => true]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => "No se pudo enviar el email"]);
}

