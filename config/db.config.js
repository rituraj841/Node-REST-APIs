const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var chalk = require('chalk');
// database name is the same as created and its in the URL part
var dburl = 'mongodb+srv://riturajanand:riturajanand@cluster0-tzdl4.mongodb.net/imdb?retryWrites=true&w=majority';

const passDBData = {};//const to pass DB values to controller
passDBData.url = dburl;
passDBData.CRUDdetail = require("../models/CRUDModel")(mongoose);//getting DB schemas here
module.exports = passDBData;//exporting for usage in other components

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(chalk.yellow('Mongoose connected to '+dburl ));
  })
  .catch(err => {
    console.log(chalk.red("Cannot connect to the database!", err));
    process.exit();
  });
