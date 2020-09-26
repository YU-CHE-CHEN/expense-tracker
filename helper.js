const Handlebars = require('handlebars')
Handlebars.registerHelper('ifEquals', function (categoryName, filter, options) {
  if (categoryName === filter) {
    return options.fn(this)
  }
  return options.inverse(this)
})