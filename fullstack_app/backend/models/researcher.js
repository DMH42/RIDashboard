import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const researcher = new Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    orcidID: {type: 'String', required: false},
    scopusID: {type: 'String', required: false},
    dimensionsID: {type: 'String', required: false},

    orcidID: {type: 'String', required: false},

    publicationNumber: { type: 'Number', required: true, default: 0 },
    citationCount: { type: 'Number', required: true, default: 0 },
    hIndexScopus: { type: 'Number', required: true, default: 0 },
    hIdex: { type: 'Number', required: true, default: 0 },
    awards: { type: 'Number', required: true, default: 0 },
    altmetricScore: { type: 'Number', required: true, default: 0 },
    publicationNumber: { type: 'Number', required: true, default: 0 },

    departments: [{ type: String }],

  });

  export default mongoose.model('Researcher', researcher);