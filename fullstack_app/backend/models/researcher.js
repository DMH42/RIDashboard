import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const researcher = new Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    orcidID: {type: 'String', required: false},
    scopusID: {type: 'String', required: false},
    scopusEID: {type: 'String', required: false},
    dimensionsID: {type: 'String', required: false},
    scoupsDocCount: { type: 'Number', required: true, default: 0 },
    scopusCitationCount: { type: 'Number', required: true, default: 0 },
    scopusHIndex: { type: 'Number', required: true, default: 0 },
    scopusCoauthorCount: { type: 'Number', required: true, default: 0 },
    hIdex: { type: 'Number', required: true, default: 0 },
    awards: { type: 'Number', required: false, default: 0 },
    altmetricScore: { type: 'Number', required: false, default: 0 },
    publicationRange: { 
      start: {type: 'Number'}, 
      end:{type:'Number'} 
    },
    scopusCitedByCount: { type: 'Number', required: true, default: 0 },

    departments: [{ type: String }],
    grantCount: {type: 'Number'},
    grantTotal: {type: 'Number'},



  });

  export default mongoose.model('Researcher', researcher);