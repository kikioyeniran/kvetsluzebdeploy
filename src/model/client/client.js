import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = Schema({
    clientID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});

ClientSchema.set('timestamps', true);
let Client = module.exports = mongoose.model('Client', ClientSchema);


module.exports.createUser = (newUser, callback)=> {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}