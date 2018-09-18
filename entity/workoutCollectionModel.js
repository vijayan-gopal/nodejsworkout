const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const categoryCollectionschema = new Schema({
  workout_title: {type: String,required: [true,'Enter workout title e.g. Morning Run'],max: 128},
  workout_note:{type: String,max: 256},
  calories_burn_per_min: {type: Number},
  category_id: [{type: ObjectId,ref:'workout_category'}],
  workout_id: {type: ObjectId}
});

const workout_collection = mongoose.model('workout_collection',categoryCollectionschema)

module.exports = workout_collection