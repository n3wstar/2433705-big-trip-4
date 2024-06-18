import dayjs from 'dayjs';

import { MSEC_IN_DAY, MSEC_IN_HOUR } from './const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomValue(items){
  return items[getRandomNumber(0, items.length - 1)];

}


function formatStringToDateTime(dateTime){
  return dayjs(dateTime).format('DD/MM/YY HH:mm');
}

function formatStringToShortDate(dateTime){
  return dayjs(dateTime).format('MMM DD');
}

function formatStringToTime(dateTime){
  return dayjs(dateTime).format('HH:mm');
}

function getDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDiff >= MSEC_IN_DAY) {
    return dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MSEC_IN_HOUR) {
    return dayjs.duration(timeDiff).format('HH[H] mm[M]');
  }
  return dayjs.duration(timeDiff).format('mm[M]');
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function isBigDifference(firstPoint, secondPoint) {
  return firstPoint.dateFrom !== secondPoint.dateFrom || firstPoint.price !== secondPoint.price || sortByTime(firstPoint, secondPoint) !== 0;
}

function sortByTime(firstPoint, secondPoint) {
  const timeFrom = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
  const timeTo = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));

  return timeTo - timeFrom;
}

function sortByPrice(firstPoint, secondPoint) {
  return secondPoint.basePrice - firstPoint.basePrice;
}

function sortByDay(firstPoint, secondPoint) {
  const timeA = dayjs(firstPoint.dateFrom);
  const timeB = dayjs(secondPoint.dateFrom);

  return timeA - timeB;
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

function isPointPresent(point) {
  return dayjs().isBefore(point.dateTo) && dayjs().isAfter(point.dateFrom);
}

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

export {getRandomNumber, getRandomValue, formatStringToDateTime, formatStringToShortDate,
  formatStringToTime, getDuration, updateItem, sortByDay, sortByPrice, sortByTime, isPointFuture, isPointPast, isPointPresent, isBigDifference
};
