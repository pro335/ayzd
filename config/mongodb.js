var mongoose = require('mongoose');

const uri = "mongodb+srv://johndavis124:)gq07VYe8Di2K1x&m7@cluster0-nhcdz.mongodb.net/ayzd?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/ayzd";

module.exports = () => {
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(uri,{useNewUrlParser: true})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};