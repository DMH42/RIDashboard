//Includes documents such as Papers, Grants etc.
//Esentially serves as a chache for all of the Documents that can be exported

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const publication = new Schema({
    scopusAuthorID: {type: 'String'},
    prismUrl: {type: 'String'},
    scopusID: {type: 'String'},
    scopusEID: {type: 'String'},
    title: {type: 'String'},

    prismPublicationName: {type: 'String'},
    prismISSN: {type: 'String'},
    prismEISSN: {type: 'String'},
    prismDoi: {type: 'String'},
    scopusCitedByCount: {type: 'String'}, //TODO: Update this to a number
    bibliography: {
      totalRefCount: {type: Number},
      references: [{
        sourceTitle: {type: 'String'},
        scopusEID: {type:'String'},
        title: {type:'String'},
        citedbyCount: {type:'String'},
        ceDoi: {type:'String'},
        scopusID: {type:'String'},
      }],
    },

    prismVolume: {type: 'String'},
    prismIssueId: {type: 'String'},
    prismpageRange: {type: 'String'},
    prismPageRange: {type: 'String'},
    prismCoverDate: {type: 'String'},
    prismDisplayDate: {type: 'String'},
    prismAggType: {type: 'String'},
    scopusSubType: {type: 'String'},
    scopusDescription: {type: 'String'},
    scopusSourceID: {type: Number},

    dimensionsIssn: [{type: 'String'}],
    dimensionsId: {type: 'String'},
    dimensionsAltmetric: {type: 'String'},
    dimensionsAltmetricId: {type: 'String'},
    dimensionsDOI: {type: 'String'},
    dimensionsFieldCitationRatio: {type: 'String'},
    dimensionsRelativeCitationRatio: {type: 'String'},
    
    dimensionsCitedCount: {type: 'String'},
    dimensionsYear: {type: 'String'},
    dimensionsVolume: {type: 'String'},
    dimensionsIssue: {type: 'String'},
    dimensionsTitle: {type: 'String'},
    dimensionsGrantIDs: [{type: 'String'}],
    dimensionsReferenceIDs: [{type: 'String'}],
    dimensionsJournalID: {type: 'String'},
    dimensionsJournalTitle: {type: 'String'},
    dimensionsType: {type: 'String'}

    


  });

      // title: { type: 'String', required: true },
    // sourceTitle: {type: 'String', required: true},
    // contributors: [{type: String}],
    // lastScopusUpdate:{type: Date},
    // lastDimensionsUpdate:{type:Date},
    // scopus:{type:Boolean},
    // dimensions:{type:Boolean},

    // publishStringDate:{type: 'String'},
    // publishDateDate:{type: Date},

    // scopusID:{type: 'String'},
    // scopusEID:{type: 'String'},
    // scopusPID:{type: 'String'},
    // scopusCitedCount:{type: 'String'},
    // scopusSubType:{type: 'String'},
    // scopusSourceID:{type: 'String'},
    // scopusAffiliation:[{
    //   affilName: {type: 'String'},
    //   affilCity: {type: 'String'},
    //   affilCountry: {type: 'String'}
    // }],


    // prismPublicationName:{type: 'String'},
    // prismPageRange:{type:'Strimg'},
    // prismCoverDate:{type: 'String'},
    // prismCoverDisplayDate:{type: 'String'},
    // prismDOI:{type: 'String'},
    // prismAgregateType:{type: 'String'},
    // prismISSN:{type: 'String'},
    // prismVolume:{type: 'String'},
    // prism:{type: 'String'},



    // topPublishingJournals: [{type: String}],
    // topCitedJournals: [{type: String}],
    // topFieldJournals: [{type: String}],
    // researchers: [{type: String}],
    // awardsCount: {type: 'String', required: true},
    // lastUpdate: {type: Date},
    // pubMedID:{type: 'String'}

  export default mongoose.model('Publication', publication);