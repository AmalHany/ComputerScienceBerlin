var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: {
    type: String,

  },
          phone: {
          type: String,

  },
                email: {
                  type: String,
  
  },
                          category: {
                            type: String,

  }
});

module.exports = mongoose.model('updateCompanyInfo', Schema);
