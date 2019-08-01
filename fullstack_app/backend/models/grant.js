import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const grant = new Schema({
    end_date: {type: 'String'},
    original_title: {type: 'String', required: true},
    active_year: [{type: Number}],
    id: {type: 'String'},
    funding_usd: {type: Number},
    linkout: {type: 'String'} ,
    funding_currency: {type: 'String'},
    start_date: {type: 'String'},
    title: {type: 'String'},
    project_num: {type: 'String'},
    funding_org_name: {type: 'String'},
    start_year: {type: 'String'},
    researcherID: {type: 'String', required: true},

});

export default mongoose.model('Grant', grant);