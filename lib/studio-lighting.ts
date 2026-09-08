/** Studio lighting follows the visitor's local clock, including local DST changes. */
export function studioLightingAt(date: Date) {
  const hour = date.getHours();
  const night = hour < 8 || hour >= 20;
  const nextChange = new Date(date.getTime());
  if (hour < 8) nextChange.setHours(8, 0, 0, 0);
  else if (hour < 20) nextChange.setHours(20, 0, 0, 0);
  else {
    nextChange.setDate(nextChange.getDate() + 1);
    nextChange.setHours(8, 0, 0, 0);
  }
  return { night, nextChangeAt: nextChange.getTime() };
}
