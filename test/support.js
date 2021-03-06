require('./fixtures/');

var mongoose = require('mongoose')
  , db_uri = 'mongodb://localhost/http_runner_'+process.env.NODE_ENV;

before(function(done){
  mongoose.connect(db_uri, function(err, res){
    if(err){
      console.log("Connection with "+db_uri+" failed: " + err);
    }else{
      console.log("Connection to "+db_uri+" established.");
      done();
    }
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

});

after(function(done){
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(function(){
      done();
    });
  });
});
