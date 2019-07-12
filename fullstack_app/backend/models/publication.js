//Includes documents such as Papers, Grants etc.
//Esentially serves as a chache for all of the Documents that can be exported

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const publication = new Schema({
    title: { type: 'String', required: true },
    contributors: [{type: String}],
    lastScopusUpdate:{type: Date},
    lastDimensionsUpdate:{type:Date},
    scopus:{type:Boolean},
    dimensions:{type:Boolean},

    publishStringDate:{type: 'String'},
    publishDateDate:{type: Date},

    scopusID:{type: 'String'},
    scopusEID:{type: 'String'},
    scopusPII:{type: 'String'},
    scopusCitedCount:{type: 'String'},
    scopusSubType:{type: 'String'},
    scopusSourceID:{type: 'String'},
    scopusAffiliation:[{
      affilName: {type: 'String'},
      affilCity: {type: 'String'},
      affilCountry: {type: 'String'}
    }],


    prismPublicationName:{type: 'String'},
    prismPageRange:{type:'Strimg'},
    prismCoverDate:{type: 'String'},
    prismCoverDisplayDate:{type: 'String'},
    prismDOI:{type: 'String'},
    prismAgregateType:{type: 'String'},
    prismISSN:{type: 'String'},
    prismVolume:{type: 'String'},
    prism:{type: 'String'},



    topPublishingJournals: [{type: String}],
    topCitedJournals: [{type: String}],
    topFieldJournals: [{type: String}],
    researchers: [{type: String}],
    awardsCount: {type: 'String', required: true},
    lastUpdate: {type: Date},
    pubMedID:{type: 'String'},

  });

  export default mongoose.model('Publication', publication);