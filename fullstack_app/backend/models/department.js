import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const department = new Schema({
  name: { type: 'String', required: true },
  topPublishingJournals: [[{ type: String }]],
  topCitedJournals: [[{ type: String }]],
  topFieldJournals: [{
    title: { type: String },
    coverageStartYear: { type: String },
    coverageEndYear: { type: String },
    scopusSourceID: { type: String },
    prismISSN: { type: String },
    prismEISSN: { type: String },

    SNIPScore: { type: Number },
    SNIPYear: { type: String },

    SJRScore: { type: Number },
    SJRYear: { type: String },

    citeScoreMetric: { type: Number },
    citeScoreCurrentMetricYear: { type: String },
    citeScoreTracker: { type: String },
    citeScoreTrackerYear: { type: String },
  }],

  researchers: [{ type: String }],
  awardsCount: { type: 'String', required: false },
  sourceDict: {},
  lastUpdate: { type: Date }
});

export default mongoose.model('Department', department);