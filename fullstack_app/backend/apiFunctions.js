import axios from 'axios'
import Publication from './models/publication'
import Department from './models/department';
import { promises } from 'fs';
import { rejects } from 'assert';
var mongoose = require('mongoose');


async function requestElsevier(urlComplement, params) {//async here
  try {
    const baseurl = 'https://api.elsevier.com/';
    const key = '6e851892e3e3a23dc0a6f73c72ca9080';
    var url = baseurl + urlComplement;
    params['apikey'] = key;
    let res = await axios.get(url, {//await here
      params
    });
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
function cleanRef(ref) {
  return {
    scopusEID: ref['scopus-eid'],
    title: ref['title'],
    citedbyCount: ref['citedby-count'],
    ceDoi: ref['ce:doi'],
    scopusID: ref['scopus-id'],
    sourceTitle: ref['sourcetitle']
    //could clean authors too

  }


}

function getRefsAndSave(publication) {
  var resp = requestElsevier('content/abstract/scopus_id/' + publication['scopusID'], { view: 'REF' });
  resp.then(val => {
    if (val['abstracts-retrieval-response'] == null) {
      console.log(val);
      console.log(publication);
    }
    let bibliography = val['abstracts-retrieval-response']['references'];
    let references = bibliography['reference'];
    let cleanReferences = [];
    references.forEach(reference => {
      cleanReferences.push(cleanRef(reference));
    });
    // console.log(cleanReferences);
    Publication.findByIdAndUpdate({ _id: publication._id }
      ,
      {
        $set: {
          bibliography: {
            totalRefCount: cleanReferences.length,
            references: cleanReferences
          }
        }

      }
      , { new: true },
    )
      .exec((err, pub) => {
        // console.log(err);
        // console.log(pub);
      })
  });
  //Request scopus for citation info
  //go over array
  //update references 


}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}


function fetchSourcesOfPublications() {
  Publication.find()
    .exec(async (err, publications) => {
      // console.log(publications[0]);
      // getRefsAndSave(publications[0]);

      for (let i = 0; i < publications.length; i++) {
        const publication = publications[i];
        await sleep(1500);
        getRefsAndSave(publication);

      }
      console.log("DONE");
    });
}

function citationJournals() {
  Publication.find({ "bibliography": { $ne: null } })
    .exec(async (err, publications) => {
      var dict = {};
      var sourceDict = {};//add dictionary of arrays with ids maybe like 5 if not try 10
      for (let i = 0; i < publications.length; i++) {
        var publication = publications[i];
        for (let j = 0; j < publication['bibliography']['references'].length; j++) {
          const sourceTitle = publication['bibliography']['references'][j]['sourceTitle'];
          if (publication['bibliography']['references'][j]['sourceTitle'] != null) {
            if (dict[sourceTitle] !== undefined) {//TODO: allow to add ids
              dict[sourceTitle] = dict[sourceTitle] + 1;

            } else {
              dict[sourceTitle] = 0
            }

            if (sourceDict[sourceTitle] != undefined) {
              // console.log(publication['bibliography']['references'][j]['scopusID']);
              if (sourceDict[sourceTitle].length < 5) {
                sourceDict[sourceTitle].push(publication['bibliography']['references'][j]['scopusID'])
              }
            } else {
              console.log("potato")
              if (sourceTitle == "Science") {
                console.log("adding:" + publication['bibliography']['references'][j]['scopusID'])

              }
              sourceDict[sourceTitle] = []
              if (publication['bibliography']['references'][j]['scopusID'] != undefined) {
                sourceDict[sourceTitle].push(publication['bibliography']['references'][j]['scopusID'])

              }

            }
          }
        }
      }
      var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });

      // Sort the array based on the second element
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      Department.findOneAndUpdate({ name: 'Chemical Engineering' },
        {
          $set: {
            topCitedJournals: items.slice(0, 30),
            sourceDict,
          }

        },
        { new: true },
      ).exec((err, dep) => {
        //console.log(dep);
      })
      console.log("DONE")
      //console.log(items.slice(0, 30));

    });
}

function cleanJournal(journalRes) {

  // console.log(goodJ['SNIPList']);
  //then create the new object and add the values
  var resJournal = {
    title: journalRes['dc:title'],
    coverageStartYear: journalRes['coverageStartYear'],
    coverageEndYear: journalRes['coverageEndYear'],
    scopusSourceID: journalRes['source-id'],
    prismISSN: journalRes['prism:issn'],
    prismEISSN: journalRes['prism:eIssn'],

    
  }
 if (journalRes['SNIPList']['SNIP'][0]!= undefined){
  resJournal['SNIPScore'] =  Number(journalRes['SNIPList']['SNIP'][0]['$']);
  resJournal['SNIPYear']= journalRes['SNIPList']['SNIP'][0]['@year'];
 }

 if (journalRes['SJRList']['SJR'][0]!= undefined){
  resJournal['SJRScore'] =  Number(journalRes['SJRList']['SJR'][0]['$']);
  resJournal['SJRYear']= journalRes['SJRList']['SJR'][0]['@year'];
 }
 


 if (journalRes['citeScoreYearInfoList']!= undefined){
  resJournal['citeScoreMetric'] =  Number(journalRes['citeScoreYearInfoList']['citeScoreCurrentMetric']);
  resJournal['citeScoreCurrentMetricYear']= journalRes['citeScoreYearInfoList']['citeScoreCurrentMetricYear'];
  resJournal['citeScoreTracker'] =  journalRes['citeScoreYearInfoList']['citeScoreTracker'];
  resJournal['citeScoreTrackerYear']= journalRes['citeScoreYearInfoList']['citeScoreTrackerYear'];
  
 }
 


  // console.log(resJournal);

  //add the data values
  return resJournal;
}

function fixJournal(journal) {//Potentailly add more rules here
  var newJournalName = String(journal[0]).toLowerCase();
  if (newJournalName.includes("and")) {
    newJournalName = newJournalName.replace("and", "&");
    var newJournal = journal.slice();
    newJournal[0] = newJournalName;
    return newJournal;
  } else if (newJournalName.includes("the")) {
    newJournalName = newJournalName.replace("the", "");
    var newJournal = journal.slice();
    newJournal[0] = newJournalName;
    return newJournal;

  }
  else if (newJournalName.includes("The")) {
    newJournalName = newJournalName.replace("The", "");
    var newJournal = journal.slice();
    newJournal[0] = newJournalName;
    return newJournal;

  }
  return null;

}

async function journalLoopIds(journal, ids) {
  for (let j = 0; j < ids.length; j++) {
    var ans = getJournalDataLR(journal, ids[j]);
    var jData = await ans;
    // console.log("this is ans:" + ans);
    if (jData != null && jData != undefined) {
      // console.log("sucess finding " + journal[0] + " with id: " + ids[j])
      return jData;

    } else {
      // console.log("gonna rest")

    }


  }

}


async function getJournalDataLR(journal, scopus_id) {



  var source;
  var val;
  var resVal = null;

  source = await requestElsevier(`content/abstract/scopus_id/${scopus_id}`, {});

  var issn = source['abstracts-retrieval-response']['coredata']['prism:issn'];
  if (issn == undefined) {
    return null;
  }
  // console.log(issn)


  val = await requestElsevier('content/serial/title', { issn });
  if (val['serial-metadata-response']['entry'] != undefined) {
    for (let i = 0; i < val['serial-metadata-response']['entry'].length; i++) {
      var jour = val['serial-metadata-response']['entry'][i];
      // console.log(jour);
      var foundTitle = jour['dc:title'];

      if (String(foundTitle).toLowerCase() === String(journal[0]).toLowerCase()) {
        // console.log("got em!")
        resVal = jour;

        return (jour);
      } else {
        var fixedJournal = fixJournal(journal);
        while (fixedJournal != null) {
          if (String(foundTitle).toLowerCase() === String(fixedJournal[0]).toLowerCase()) {
            // console.log("got em!")
            resVal = jour;

            return (jour);
          }
          fixedJournal = fixJournal(journal);
        }
      }
    }
  }
  // console.log("sadly returning null")









}


function getJournalData(journal, ids) {
  // console.log(ids);
  //fetch journal using the elsevier api
  var resp = requestElsevier('content/serial/title', { title: journal[0] });
  return resp.then((val) => {
    var goodJ = null;
    if (val['serial-metadata-response']['entry'] == null && val['serial-metadata-response']['error'] == 'No results found') {
      console.log("No search results on: ");
      console.log(journal[0]);
      var fixedJournal = fixJournal(journal);
      if (fixedJournal != null) {
        console.log(fixedJournal);
        return getJournalData(fixedJournal, ids);

      }
      return null;

    }
    //find the good one among the responses
    for (let i = 0; i < val['serial-metadata-response']['entry'].length; i++) {
      const jour = val['serial-metadata-response']['entry'][i];
      var title = String(jour['dc:title']).toLowerCase().trim();
      var originalTitle = String(journal[0]).toLowerCase().trim();
      var otherTitle = String(fixJournal( journal[0])).toLowerCase().trim();
      if (title === originalTitle || title === otherTitle) {
        goodJ = jour;
        return goodJ;
      }
    }
    //There are some that can still be taken however publisher information is needed
    //Could also be fixed with having more results.
    if (goodJ == null) {
      console.log("No matches found on: ");//This means there were too many results and wasn't narrow enough
      console.log(journal[0]);
      var fixedJournal = fixJournal(journal);//If it could be modified to make it easier to search
      if (fixedJournal != null) {
        console.log("going to re-search")
        return getJournalData(fixedJournal, ids);

      } else {
        //try using the issn to narrow the search

        return journalLoopIds(journal, ids);
      }

    }
    //find the correct one amog the entrties
    //return the neat thing

  });

}

function containsJournal(journalArray, journalName){
  if (journalName === "The Journal of Chemical Physics"){
    console.log("Checking for the journal")
  }
  for (let i = 0; i < journalArray.length; i++) {
    const j = journalArray[i];
    if (j['title'].toLowerCase()===journalName.toLowerCase()){
      return true;
    } else {
      var fixedJournal = fixJournal(journalName);
      while(fixedJournal!=null){
        console.log('eee')
        if (j['title'].toLowerCase()===fixedJournal.toLowerCase()){
          return true;
        } else {
          fixedJournal = fixJournal(fixedJournal);
        }

      }
    }
  }
  return false;
}

function fetchJournalRankings() {
  Department.findOne()
    .exec(async (err, department) => {
      var oldTopPublishingJournals = department['topPublishingJournals'];
      var oldTopCitedJournals = department['topCitedJournals'];
      var newTopPublishingJournals = [];
      var topJournals = [];
      var newTopCitedJournals = [];

      for (let i = 0; i < oldTopPublishingJournals.length; i++) {
        var journal = oldTopPublishingJournals[i];
        await sleep(500);
        //TODO 
        if (!containsJournal(topJournals,journal[0])){
          var pushVal = await getJournalData(journal, department['sourceDict'][journal[0]]);
          if (!(pushVal == undefined || pushVal == null)){
            topJournals.push(cleanJournal(pushVal));//returns an array containing the old journal data plus extra new data
            }
        }


      }

      for (let i = 0; i < oldTopCitedJournals.length; i++) {
        var journal = oldTopCitedJournals[i];
        await sleep(1500);
        if (!containsJournal(topJournals,journal[0])){
          var pushVal = await getJournalData(journal, department['sourceDict'][journal[0]]);
          if (!(pushVal == undefined || pushVal == null)){
            topJournals.push(cleanJournal(pushVal));//returns an array containing the old journal data plus extra new data
            }
        }



      }



      // console.log("Publishing:")

      // for (let i = 0; i < newTopPublishingJournals.length; i++) {
      //   const jj = newTopPublishingJournals[i];
      //   console.log(jj['title']);
      // }
      // console.log("Cited:")

      // for (let i = 0; i < topJournals.length; i++) {
      //   const jj = topJournals[i];
      //   console.log(jj['title']);
      // }

      console.log(topJournals);

      Department.findOneAndUpdate({name: 'Chemical Engineering'},
        {
          $set: {
            topFieldJournals: topJournals,
          }

        },
         { new: true },
          ).exec((err, dep)=>{
            console.log(dep);
          })


    })
}



module.exports = {
  elsevierAuthorSearch: async function foo(authorID) {
    var searchComplement = 'content/search/scopus';
    var searchParams = {
      start: 0,
      count: 200,
      query: `AU-ID(${authorID})`,
    }

    var metricsComplement = `content/author/author_id/${authorID}`;
    var metricsParams = {
      view: 'METRICS',
    }
    // email api people about this
    // var docComplement = `content/author/author_id/${authorID}`;
    // var docParams = {
    //   view: 'DOCUMENTS',
    // }

    var basicComplement = `content/author/author_id/${authorID}`;
    var basicParams = {
      view: 'ENHANCED',
    }

    //request data for statistics
    var searchData = requestElsevier(searchComplement, searchParams);
    var metricsData = requestElsevier(metricsComplement, metricsParams);
    var basicData = requestElsevier(basicComplement, basicParams);


    return Promise.all([searchData, metricsData, basicData]).then(vals => {
      //console.log(vals);
      var data = {
        searchData,
        metricsData,
        basicData,
      }
      return vals;

    });
    //now request author overview

    // .then(function (data) {
    //   //console.log(JSON.stringify(data));
    //   console.log("Data is being passed over, gonna exit");

    //   return data;
    // });
  },

  saveDocuments: function bar(documents) {
    //console.log(JSON.stringify(documents));
    var docArr = documents['entry'];
    var id = String(documents['opensearch:Query']['@searchTerms']);
    id = id.substring(6, id.length - 1);

    docArr.forEach(doc => {
      var data = {
        scopusAuthorID: id,
        prismUrl: doc['prism:url'],
        scopusID: String(doc['dc:identifier']).split(":")[1],
        scopusEID: doc['eid'],
        title: doc['dc:title'],

        prismPublicationName: doc['prism:publicationName'],
        prismISSN: doc['prism:issn'],
        prismEISSN: doc['prism:eIssn'],
        prismDoi: doc['prism:doi'],
        scopusCitedByCount: doc['citedby-count'],


        prismVolume: doc['prism:volume'],
        prismIssueId: doc['prism:issueIdentifier'],
        prismpageRange: doc['prism:pageRange'],
        prismCoverDate: doc['prism:coverDate'],
        prismDisplayDate: doc['prism:coverDisplayDate'],
        prismAggType: doc['prism:aggregationType'],
        scopusSubType: doc['subtype'],
        scopusDescription: doc['subtypeDescription'],
        scopusSourceID: Number(doc['source-id']),
      }
      var pubDoc = new Publication(data);
      pubDoc.save()
        .then(() => {
          console.log(pubDoc);
        })
      // console.log(JSON.stringify(data));
    });

    return null;
  },



  bootProcess: function ok() {
    // fetchSourcesOfPublications();
    // citationJournals();
    // fetchJournalRankings();
  },

  deptmntStatUpdate: function ss() {
    Publication.find()
      .exec((err, publications) => {
        var dict = {};
        //console.log(publications);
        publications.forEach(publication => {
          if (dict[publication['prismPublicationName']] !== undefined) {
            dict[publication['prismPublicationName']] = dict[publication['prismPublicationName']] + 1;
          } else {
            dict[publication['prismPublicationName']] = 0
          }
        });

        //sorting to get the top 10 Journals
        // Create items array
        var items = Object.keys(dict).map(function (key) {
          return [key, dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
          return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        // console.log(items.slice(0, 10));

        var chemE = new department({
          name: "Chemical Engineering",
          topPublishingJournals: items.slice(0, 10)
        });
        chemE.save();
        console.log(chemE);

        // console.log(dict);
      });
  },
};
