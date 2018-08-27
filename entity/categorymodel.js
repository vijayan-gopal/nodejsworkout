const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const categoryschema = new Schema({
  category_id: ObjectId,
  category_name: String
});

const workout_category = mongoose.model('workout_category',categoryschema)

module.exports = workout_category