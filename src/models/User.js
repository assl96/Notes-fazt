const {Schema, model} = require('mongoose');
const bcryp = require('bcryptjs'),

 const UserSchema = new Schema({
     name: { type: String, required: true},
     email: { type: String, required: true},
     password: { type: String, required: true}
 }, {timestamps: true}
 );

 //cifrar la contraseña
 UserSchema.methods.encrypPass = password => {
   const salt = await bcryp.genSalt(10);
   bcryp.hash(password, salt);
 };

 //comparar las contraseñas ingresadas con las almacenadas en la DB
 UserSchema.methods.matchPass = function(password) {
    return await bcryp.compare(password, this.password);
 }

 module.exports = model('User', UserSchema)