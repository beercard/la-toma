const formatTime = (totalMinutes: number) => {
  const normalizedMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (normalizedMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const buildTimeRange = (startHour: number, endHour: number) => {
  const start = startHour * 60;
  let end = endHour * 60;

  if (end <= start) {
    end += 24 * 60;
  }

  const values: string[] = [];

  for (let current = start; current <= end; current += 30) {
    values.push(formatTime(current));
  }

  return values;
};

export const getAvailableTimeOptions = (dateValue: string) => {
  if (!dateValue) {
    return [];
  }

  const selectedDate = new Date(`${dateValue}T12:00:00`);
  const dayOfWeek = selectedDate.getDay();

  if (dayOfWeek === 4 || dayOfWeek === 5) {
    return buildTimeRange(18, 2);
  }

  if (dayOfWeek === 6) {
    return [...buildTimeRange(10, 14), ...buildTimeRange(19, 3)];
  }

  return [];
};
