require('./fixtures/');

var mongoose = require('mongoose');

after(function(done){
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(function(){
      done();
    });
  });
});
