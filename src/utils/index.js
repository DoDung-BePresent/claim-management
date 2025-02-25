export function calculateWorkingHours(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = end.getTime() - start.getTime();

  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weeks = Math.floor(days / 7);

  const workingDays = days - weeks * 2;

  return workingDays * 8;
}
