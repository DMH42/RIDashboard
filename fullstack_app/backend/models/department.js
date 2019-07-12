import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const department = new Schema({
    name: { type: 'String', required: true },
    topPublishingJournals: [{type: String}],
    topCitedJournals: [{type: String}],
    topFieldJournals: [{type: String}],
    researchers: [{type: String}],
    awardsCount: {type: 'String', required: true},
    lastUpdate: {type: Date}
  });

  export default mongoose.model('Department', department);