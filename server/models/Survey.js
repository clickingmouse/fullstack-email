const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, defaul: 0 },
  //Relationship field: "_user" belong to an Object of User Collection
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date

  //  googleId: String,
  //  credits: { type: Number, default: 0 }
});

//create model class
mongoose.model('surveys', surveySchema);
