import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema; 

const CleanerSchema = Schema({
    cleanerId: {
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

CleanerSchema.set('timestamps', true);
let Cleaner = module.exports = mongoose.model('cleaner', CleanerSchema);


module.exports.createUser = (newUser, callback)=> {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}