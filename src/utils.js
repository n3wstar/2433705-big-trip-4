import dayjs from 'dayjs';
import { DURATION } from './mock/consts.js';
import { MSEC_IN_DAY, MSEC_IN_HOUR } from './const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomValue(items){
  return items[getRandomNumber(0, items.length - 1)];

}

let date = dayjs().subtract(getRandomNumber(0, DURATION.DAY), 'day').toDate();

function getDate({next}){
  const minDiff = getRandomNumber(0, DURATION.MINUTE);
  const hourDiff = getRandomNumber(0, DURATION.HOUR);
  const dayDiff = getRandomNumber(0, DURATION.DAY);
  if(next){
    date = dayjs(date)
      .add(minDiff, 'minute')
      .add(hourDiff, 'hour')
      .add(dayDiff, 'day')
      .toDate();
  }

  return date;
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

export {getRandomNumber, getRandomValue, getDate, formatStringToDateTime, formatStringToShortDate,
  formatStringToTime, getDuration, updateItem
};
