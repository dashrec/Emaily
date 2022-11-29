const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);


//indicate type. we are setting up some type of relationship. We're going to assign an object to this property and ref prop 
//every survey is going to belong to a very particular user.
//whenever a schema actually gets saved to our database, if we look up this user property, we will see an ID assigned to this field and it will be the ID of the user who owns this record.