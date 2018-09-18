const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const activeschema = new Schema({
  workout_id: {type: ObjectId},
  start_time: {},
  starte_date: {type: Date},
  end_date: {type: Date},
  end_time: {},
  comment: {type: String,max: 64},
  status: {type:Boolean}

  
});

const workout_collection = mongoose.model('workout_collection',activeschema)

module.exports = workout_collection