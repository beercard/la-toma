import { SITE_ADDRESS_FULL, SITE_LOCATION_TITLE } from "./siteConfig";

export interface EventsEmailData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  eventType: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  comments: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildRow = (label: string, value: string) => `
  <tr>
    <td style="padding: 0 0 10px; vertical-align: top; width: 180px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; letter-spacing: 0.08em; text-transform: uppercase; color: #b76856;">
      ${escapeHtml(label)}
    </td>
    <td style="padding: 0 0 10px; vertical-align: top; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 22px; color: #232323;">
      ${escapeHtml(value || "-")}
    </td>
  </tr>
`;

export const buildEventsEmailSubject = (data: EventsEmailData) =>
  `Nueva consulta de eventos - ${data.fullName}`;

export const buildEventsWhatsappMessage = (data: EventsEmailData) =>
  [
    "Hola La Toma, quiero consultar por un evento.",
    "",
    `Nombre y Apellido: ${data.fullName}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Email: ${data.email}`,
    `Celular: ${data.phone}`,
    `Tipo de evento: ${data.eventType}`,
    data.branch ? `Sucursal: ${data.branch}` : null,
    `Fecha: ${data.date}`,
    `Hora: ${data.time}`,
    `Cantidad de personas: ${data.guests}`,
    data.comments ? `Comentarios: ${data.comments}` : null,
  ]
    .filter(Boolean)
    .join("\n");

export const buildEventsEmailHtml = (data: EventsEmailData, logoUrl: string) => `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(buildEventsEmailSubject(data))}</title>
  </head>
  <body style="margin: 0; padding: 24px; background: #f7f4ef;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 720px; border-collapse: collapse; background: #ffffff;">
            <tr>
              <td style="padding: 32px 32px 20px; background: #dad4cb;" align="center">
                <img src="${escapeHtml(logoUrl)}" alt="La Toma" style="display: block; width: 252px; max-width: 100%; height: auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; background: #ffffff;">
                <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: #b76856;">
                  Nueva solicitud de eventos
                </p>
                <h1 style="margin: 0 0 20px; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 34px; font-weight: 600; color: #232323;">
                  Dejanos tus datos y te contactaremos
                </h1>
                <p style="margin: 0 0 24px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 24px; color: #232323;">
                  Llego una nueva consulta desde el formulario de Eventos de La Toma.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                  ${buildRow("Nombre y Apellido", data.fullName)}
                  ${buildRow("Empresa", data.company || "-")}
                  ${buildRow("Email", data.email)}
                  ${buildRow("Celular", data.phone)}
                  ${buildRow("Tipo de evento", data.eventType)}
                  ${buildRow("Sucursal", data.branch || "-")}
                  ${buildRow("Fecha", data.date)}
                  ${buildRow("Hora", data.time)}
                  ${buildRow("Cantidad de personas", data.guests)}
                  ${buildRow("Comentarios", data.comments || "-")}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 32px; background: #f4eee6;">
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #6c6257;">
                  La Toma Multiespacio<br />
                  ${escapeHtml(SITE_LOCATION_TITLE)}, ${escapeHtml(SITE_ADDRESS_FULL)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const buildEventsClientEmailHtml = (data: EventsEmailData, logoUrl: string) => `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recibimos tu consulta de eventos | La Toma</title>
  </head>
  <body style="margin: 0; padding: 24px; background: #f7f4ef;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 720px; border-collapse: collapse; background: #ffffff;">
            <tr>
              <td style="padding: 32px 32px 20px; background: #dad4cb;" align="center">
                <img src="${escapeHtml(logoUrl)}" alt="La Toma" style="display: block; width: 252px; max-width: 100%; height: auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; background: #ffffff;">
                <p style="margin: 0 0 8px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: #b76856;">
                  Consulta recibida
                </p>
                <h1 style="margin: 0 0 18px; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 34px; font-weight: 600; color: #232323;">
                  Gracias por escribirnos
                </h1>
                <p style="margin: 0 0 18px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 24px; color: #232323;">
                  Hola ${escapeHtml(data.fullName)}. Recibimos tu consulta para eventos en La Toma. En breve el equipo se va a comunicar con vos.
                </p>
                <p style="margin: 0 0 24px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 24px; color: #232323;">
                  Este es el resumen de tu solicitud:
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                  ${buildRow("Tipo de evento", data.eventType)}
                  ${buildRow("Fecha", data.date)}
                  ${buildRow("Hora", data.time)}
                  ${buildRow("Cantidad de personas", data.guests)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 32px; background: #f4eee6;">
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #6c6257;">
                  La Toma Multiespacio<br />
                  ${escapeHtml(SITE_LOCATION_TITLE)}, ${escapeHtml(SITE_ADDRESS_FULL)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
