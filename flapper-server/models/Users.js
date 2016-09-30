var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hashed_pw: String
})

UserSchema.methods.setPassword = function(password){
  this.hashed_pw = bcrypt.hashSync(password, 12)
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.hashed_pw)
}

UserSchema.methods.generateJWT = function(){
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET')
}

mongoose.model('User', UserSchema)
