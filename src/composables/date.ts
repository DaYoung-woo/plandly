export function calculateDate(date: Date) {
  const targetDate = new Date(date);
  const today = new Date();
  return Math.abs((today.getFullYear() - targetDate.getFullYear())*12 + (today.getMonth() - targetDate.getMonth()));
}