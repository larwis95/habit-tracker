const { formatDate } = require("date-fns");

module.exports = {
  handlebarsDate: (date) => formatDate(date, 'MM/dd/yyyy'),
};
