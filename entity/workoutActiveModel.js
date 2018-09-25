const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
const activeschema = new Schema({
  workout_id: {type: ObjectId,ref:'workout_collection'},
  start_time: {type: String},
  start_date: {type: String},
  end_date: {type: String},
  end_time: {type: String},
  comment: {type: String},
  status: {type:Boolean}

  
});

const workout_active = mongoose.model('workout_active',activeschema)

module.exports = workout_active