import dayjs from 'dayjs';

export function formatMonthDay(date, formatStr = 'MM月DD日') {
  return dayjs(date).format(formatStr);
}

export function getDiffDats(startDate, endDate) {
  return dayjs(startDate).diff(endDate, 'day');
}
