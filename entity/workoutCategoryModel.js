const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
 
const categoryschema = new Schema({
  category_name: {type: String,required: [true, 'Please enter category name e.g. Jogging'],index: true}
});

const workout_category = mongoose.model('workout_category',categoryschema)

module.exports = workout_category