// date format: 1 Jul 2023
export function dateToDayMonthYear(date: string) {
  const parsedDate = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${parsedDate.getDate()} ${
    months[parsedDate.getMonth()]
  } ${parsedDate.getFullYear()}`;
}

// date format: dd-mm-yyyy
export function reverseDateFormat(date: string) {
  return date.split("-").reverse().join("-");
}
