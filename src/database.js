const mongoose = require('mongoose');

//const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE, MONGODB_URI} = process.env;
//const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;
const MONGODB_URI = "mongodb+srv://kevin:12345@cluster0.6xvoq7h.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true
})
    .then(db => console.log('DataBase is connected'))
    .catch(err => console.log(err));