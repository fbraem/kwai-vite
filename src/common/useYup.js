import * as yup from 'yup';
import dayjs from '/src/common/useDayJS.js';

yup.addMethod(yup.date, 'format', function(format) {
  return this.transform(function(value, original) {
    if (original === '') return null;

    const d = dayjs(original, format, true);
    if (d.isValid()) {
      return d.toDate();
    }
    return original;
  });
});

export default yup;
