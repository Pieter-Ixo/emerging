// TODO: use some date library.
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 3);
const endDate = new Date();
endDate.setDate(endDate.getDate() - 3);

// eslint-disable-next-line prefer-const
let [startMonth, startDay, startYear] = [
  (startDate.getMonth() + 1).toString(),
  startDate.getDate().toString(),
  startDate.getFullYear(),
];
startDay = startDay.length === 1 ? `0${startDay}` : startDay;
startMonth = startMonth.length === 1 ? `0${startMonth}` : startMonth;

export const defaultStartDate = `${startYear}-${startMonth}-${startDay}`;

// eslint-disable-next-line prefer-const
let [endMonth, endDay, endYear] = [
  (endDate.getMonth() + 1).toString(),
  endDate.getDate().toString(),
  endDate.getFullYear(),
];
endDay = endDay.length === 1 ? `0${endDay}` : endDay;
endMonth = endMonth.length === 1 ? `0${endMonth}` : endMonth;

export const defaultEndDate = `${endYear}-${endMonth}-${endDay}`;
