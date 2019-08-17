// module.exports = {
//     database:'mongodb://localhost:27017/kvetdb',
//     secret: 'yoursecret'
// }
if(process.env.NODE_ENV === 'production'){
    module.exports = {
        database:'mongodb+srv://kikioyeniran:cAncel78$@cluster0-9rntd.mongodb.net/test',
        secret: 'yoursecret'
    }
  } else {
    module.exports = {
        database:'mongodb://localhost:27017/kvetdb',
        secret: 'yoursecret'
    }
  }