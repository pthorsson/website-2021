import _ from 'lodash';

export const sanitizeData = (data: { [key: string]: any }) =>
  Object.keys(data).reduce((obj, key) => {
    if (key[0] !== '_') {
      obj[key] = data[key];

      if (Array.isArray(obj[key])) {
        obj[key].forEach((prop) => {
          if (_.isPlainObject(prop)) {
            prop = sanitizeData(prop);
          }
        });
      } else if (_.isPlainObject(obj[key])) {
        obj[key] = sanitizeData(obj[key]);
      }
    }

    return obj;
  }, {});
