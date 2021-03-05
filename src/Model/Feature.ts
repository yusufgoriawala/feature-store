const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
    feature_id: String,
    feature_name: String,
    feature_type: String,
    feature_description: String,
    feature_created_timestamp:Date,
    feature_version: String,
    feature_owner: String,
    feature_data: String,
});

module.exports = mongoose.model('Feature', FeatureSchema,'Features');
