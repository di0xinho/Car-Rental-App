export function toDayMonthYear(dateString: string) {
  const regex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  const match = dateString?.match(regex);
  if (!match) return null;
  return (match[3] + '-' + match[2] + '-' + match[1]);
}

export function fromDateTimeToDate(dateTimeString: string) {
  if (!dateTimeString || typeof(dateTimeString) !== 'string') return null;
  const date = dateTimeString.split('T')[0];
  return date;
}

// date/time format accepted by backend API "YYYY-MM-DD HH:mm"
export function dateToNormalizedString (date: Date, timeSeparator = ' ') {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  if (month.length < 2) month = "0" + month;
  let day = date.getDate().toString();
  if (day.length < 2) day = "0" + day;
  let hours = date.getHours().toString();
  if (hours.length < 2) hours = "0" + hours;
  let minutes = date.getMinutes().toString();
  if (minutes.length < 2) minutes = "0" + minutes;
  return year + "-" + month + "-" + day + timeSeparator + hours + ":" + minutes
}