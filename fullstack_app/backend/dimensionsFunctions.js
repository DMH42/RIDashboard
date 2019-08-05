import axios from 'axios'

import Publication from './models/publication'
import Department from './models/department';
import Researcher from './models/researcher';
import Grant from './models/grant';
// import elsevier from './elsevierFunctions'


function calcAvgVals() {
    Researcher.find()
        .exec((err, researchers) => {
            var hIndexCount = 0;
            var docCount = 0;
            var citationCount = 0;
            var coAuthorCount = 0;

            // console.log(researchers);
            for (let i = 0; i < researchers.length; i++) {
                const r = researchers[i];
                hIndexCount = hIndexCount + r['scopusHIndex'];
                docCount = docCount + r['scoupsDocCount'];
                citationCount = citationCount + r['scopusCitationCount'];
                coAuthorCount = coAuthorCount + r['scopusCoauthorCount'];
            }
            // console.log(hIndexCount)
            // console.log(docCount)

            // console.log(citationCount)
            // console.log(coAuthorCount)


            Department.findOneAndUpdate({ name: 'Chemical Engineering' },
                {
                    $set: {
                        averageStatistics: {
                            hIndex: hIndexCount / researchers.length,
                            coauthorCount: coAuthorCount / researchers.length,
                            docCount: docCount / researchers.length,
                            citationCount: citationCount / researchers.length,
                        }
                    }

                },
                { new: true },
            ).exec((err, dep) => {
                console.log(dep);
                console.log(err);
            })




        })
}

function matchDocs(doc, savedDoc) {
    if (savedDoc.prismDoi === doc.doi) {
        return true;
    }
    // if (doc["issn"]) {
    //     for (let i = 0; i < doc["issn"].length; i++) {
    //         const element = doc["issn"][i];
    //         var str = "";
    //         var strArr = String(element).split("-")
    //         for (let j = 0; j < strArr.length; j++) {
    //             const s = strArr[j];
    //             str = str + s;

    //        5
    if (String(doc.title).toLocaleLowerCase().trim() === (String(savedDoc.title).toLocaleLowerCase()).trim()) {
        // console.log("matched title: " + savedDoc.title + " " + doc.title)
        return true;
    }



    return false;
}

function addToPubs(doc, dimensionsID){
    var data = {
        dimensionsAuthorID: dimensionsID,
        dimensionsIssn: doc.issn,
        dimensionsId: doc.id,
        dimensionsAltmetric: doc.altmetric,
        dimensionsAltmetricId: doc.altmetric_id,
        dimensionsDOI: doc.doi,
        dimensionsFieldCitationRatio: doc.field_citation_ratio,
        dimensionsRelativeCitationRatio: doc.relative_citation_ratio,
        
        dimensionsCitedCount: doc.times_cited,
        dimensionsYear: doc.year,
        dimensionsVolume: doc.volume,
        dimensionsIssue: doc.issue,
        dimensionsTitle: doc.title,
        dimensionsGrantIDs: doc.supporting_grant_ids,
        dimensionsReferenceIDs: doc.reference_ids,
        dimensionsType: doc.type,
    
    }
    if (doc.journal!==undefined){
        data["dimensionsJournalID"] = doc.journal.id,
        data["dimensionsJournalTitle"] = doc.journal.title

    }
    // var pub = new Publication(data);
    // console.log(pub)
    // pub.save()
}

//update the publications to include dimensions data
function updatePublication(savedDoc, dimensionsDoc) {
    Publication.findByIdAndUpdate({ _id: savedDoc._id },

        {
            $set: {
                dimensionsIssn: dimensionsDoc.issn,
                dimensionsId: dimensionsDoc.id,
                dimensionsAltmetric: dimensionsDoc.altmetric,
                dimensionsAltmetricId: dimensionsDoc.altmetric_id,
                dimensionsDOI: dimensionsDoc.doi,
                dimensionsFieldCitationRatio: dimensionsDoc.field_citation_ratio,
                dimensionsRelativeCitationRatio: dimensionsDoc.relative_citation_ratio,

                // dimensionsIssn: null,
                // dimensionsId: null,
                // dimensionsAltmetric: null,
                // dimensionsAltmetricId:null,
                // dimensionsDOI: null,
                // dimensionsFieldCitationRatio: null,
                // dimensionsRelativeCitationRatio: null,

            }
        },
        { new: true },

    ).exec(
        console.log("set match with: " + savedDoc._id + " and " + dimensionsDoc.doi)
    )

}


function checkOverlap() {
    Researcher.find()
        .exec((err, researchers) => {
            var dicArray = [];

            for (let i = 0; i < researchers.length; i++) {
                const researcher = researchers[i];
                //might want to await here
                var overlapCounter = {};
                overlapCounter["matches"] = 0;
                researcherOverlap(researcher.dimensionsID, researcher.scopusID, overlapCounter);
            }
        })
}

function researcherOverlap(dimensionsID, authorID, overlapCounter) {
    //fetch all publications for a given researcher from dimensions
    var res = requestDimensions('search publications where researchers.id= "' + dimensionsID + '" return publications[doi + issn + id + pmid + pmcid + reference_ids +  title + type + issue + altmetric + altmetric_id + field_citation_ratio + relative_citation_ratio + journal + linkout + supporting_grant_ids + recent_citations +  times_cited + type + volume  + year] limit 200')

    //compare the publications there to the ones that have already been saved.

    Publication.find({ scopusAuthorID: authorID })
        .exec((err, publications) => {
            Promise.all([res]).then(vals => {
                // console.log(vals[0]["publications"].length)
                arrayOverlap(publications, vals[0]["publications"], overlapCounter,dimensionsID);
            });

        })


}

function arrayOverlap(savedDocs, dimensionDocs, overlapCounter, dimensionsID) {
    for (let i = 0; i < dimensionDocs.length; i++) {
        const element = dimensionDocs[i];
        if (findDocInArr(element, savedDocs)) {
            overlapCounter["matches"] = overlapCounter["matches"] + 1;
            // console.log("match")
        } else {
            if (overlapCounter[element.type] === undefined) {
                overlapCounter[element.type] = 1;
            } else {
                overlapCounter[element.type] = overlapCounter[element.type] + 1;
            }
            // addToPubs(element, dimensionsID )

        }


    }
    console.log(overlapCounter)
}

function findDocInArr(doc, savedDocs) {
    for (let j = 0; j < savedDocs.length; j++) {
        const savedDoc = savedDocs[j];
        if (matchDocs(doc, savedDoc)) {
            // updatePublication(savedDoc,doc);
            return true;
        }


    }
    // console.log(doc)
    return false;
}


async function requestDimensions(query) {//async here
    try {
        const url = 'https://app.dimensions.ai/api/dsl.json';
        //This key changes often
        //TODO make this automatically generate the token
        const key = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJwcmluY2lwYWxzIjpbImRzbCJdLCJzdWIiOiJkbXVub3oyQVBJQHUucm9jaGVzdGVyLmVkdSIsImlhdCI6MTU2NTAyNTAzMywiZXhwIjoxNTY1MTExNDMzfQ.9PbOvX8sFvmWN9_GVylLWC59BHJV0pVW-zXMzyeWa8gDD9PP6Sfnmac0b5NFp9Vc2pRERaG4MEU-DSh3Uuyh8A"
        //   var url = baseurl + urlComplement;
        let config = {
            headers: {
                'Authorization': key,
            }
        }
        let res = await axios.post(url, query, config);
        // console.log(res.data);

        return res.data;
        // .then(function (response){
        //   //console.log(response.data);
        //   return response.data;
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
    }
    catch (err) {
        console.error(err);
    }

}

async function foo(researcherID) {
    var res = await requestDimensions('search grants where researchers.id= "' + researcherID + '" return grants[active_year + end_date   + funding_currency + funding_eur + funding_usd +  funding_org_name + id + linkout + original_title + project_num  + start_year + start_date + title + funding_usd ]');
    var grants = res['grants'];
    for (let i = 0; i < grants.length; i++) {
        const grant = grants[i];
        var data = {
            end_date: grant['end_date'],
            original_title: grant['original_title'],
            active_year: grant['active_year'],
            id: grant['id'],
            funding_usd: grant['funding_usd'],
            linkout: grant['linkout'],
            funding_currency: grant['funding_currency'],
            start_date: grant['start_date'],
            title: grant['title'],
            project_num: grant['project_num'],
            funding_org_name: grant['funding_org_name'],
            start_year: grant['start_year'],
            researcherID: researcherID,
        }
        var g = new Grant(data);
        var gr = await g.save();
        console.log("grant:")
        console.log(gr);

    }

}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}



module.exports = {
    getGrants: async function foo(researcherID) {
        var res = await requestDimensions('search grants where researchers.id= "' + researcherID + '" return grants[active_year + end_date   + funding_currency + funding_eur + funding_usd +  funding_org_name + id + linkout + original_title + project_num  + start_year + start_date + title + funding_usd ]');
        var grants = res['grants'];
        var grantTotal = 0;
        for (let i = 0; i < grants.length; i++) {
            const grant = grants[i];
            grantTotal = grant['funding_usd'] + grantTotal;
            var data = {
                end_date: grant['end_date'],
                original_title: grant['original_title'],
                active_year: grant['active_year'],
                id: grant['id'],
                funding_usd: grant['funding_usd'],
                linkout: grant['linkout'],
                funding_currency: grant['funding_currency'],
                start_date: grant['start_date'],
                title: grant['title'],
                project_num: grant['project_num'],
                funding_org_name: grant['funding_org_name'],
                start_year: grant['start_year'],
                researcherID: researcherID,
            }
            var g = new Grant(data);
            var gr = await g.save();
            // console.log("grant:")
            // console.log(gr);

        }
        console.log("done: " + res['_stats']['total_count'] + "total: " + grantTotal)
        var data = {
            grantCount: res['_stats']['total_count'],
            grantTotal: grantTotal,

        }
        return data;

    },

    saveDocuments: function bar(documents) {

    },



    bootProcess: async function ok() {
        // researcherOverlap("ur.015772023424.56", "56960692300")
        await sleep(1000)

        checkOverlap();//some interesting stuff is here
        // fetchSourcesOfPublications();
        // citationJournals();
        // foo("ur.0726756214.55");
        //   requestDimensions('search grants where researchers.id="ur.0726756214.55" return grants[investigator_details +  funding_usd + RCDC]');
        //   requestDimensions('search publications where researchers.id="ur.0726756214.55" return publications[id + title + doi]');
        // requestDimensions('search publications where title = "Hydrogen Bonding in Supramolecular Polymer Networks: Glasses, Melts, and Elastomers" return publications[id + title + doi]');
    },

    deptmntStatUpdate: function ss() {

    },
};
