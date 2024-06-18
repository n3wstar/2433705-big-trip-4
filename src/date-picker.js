import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

export default class DatePicker {
  constructor({
    dateItem,
    defaultDate,
    minDate = null,
    maxDate = null,
    onClose
  })

  {
    const parsedDate = defaultDate && dayjs(defaultDate).toDate();
    this.datePicker = flatpickr(dateItem,
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        locale: {
          firstDayOfWeek: 1,
        },
        'time_24hr': true,
        defaultDate: parsedDate,
        minDate,
        maxDate,
        onClose,
      });
  }

  setMaxDate = (date) => {
    this.datePicker.set('maxDate', date);
  };

  setMinDate = (date) => {
    this.datePicker.set('minDate', date);
  };

  destroy = () => {
    this.datePicker.destroy();
  };
}
