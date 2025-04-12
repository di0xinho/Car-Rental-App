export function toYearMonthDay(dateString: string) {
  const regex = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  const match = dateString?.match(regex);
  if (!match) return null;
  return (match[3] + '-' + match[2] + '-' + match[1]);
}

export function toDayMonthYear(dateString: string) {
  const regex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  const match = dateString?.match(regex);
  if (!match) return null;
  return (match[3] + '-' + match[2] + '-' + match[1]);
}