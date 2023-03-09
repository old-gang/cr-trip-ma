import dayjs from 'dayjs';

export function formatMonthDay(date) {
  return dayjs(date).format('MM月DD日');
}

export function getDiffDats(startDate, endDate) {
  return dayjs(startDate).diff(endDate, 'day');
}
