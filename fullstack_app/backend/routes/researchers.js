//import Researcher from '../models/researcher';
import response from '../response';
import Researcher from '../models/researcher'
import APIS from '../apiFunctions'
import Publication from '../models/publication'


const express = require('express');

const router = express.Router();



function saveResearcherToDB(data){
  // console.log(data[1]['author-retrieval-response'][0]);
  var searchData = data[0]['search-results'];
  APIS.saveDocuments(searchData);
  var scMetricsData = data[1]['author-retrieval-response'][0]; 
  var scMetCoreData = scMetricsData['coredata']; 
  var scAuthorData = data[2]['author-retrieval-response'][0]['author-profile'];
  var scAuthorCoreData = data[2]['author-retrieval-response'][0]['coredata']; 


  var researcherData = {

    firstName: scAuthorData['preferred-name']['given-name'], 
    lastName: scAuthorData['preferred-name']['surname'],
    scopusID: String(scAuthorCoreData['dc:identifier']).split(":")[1], 
    scopusEID: scAuthorCoreData['eid'],
    scopusHIndex: Number(scMetricsData['h-index']),
    scopusCoauthorCount: Number(scMetricsData['coauthor-count']),
    scoupsDocCount: Number(scMetCoreData['document-count']),
    scopusCitedByCount: Number(scMetCoreData['cited-by-count']),
    scopusCitationCount: Number(scMetCoreData['citation-count']),

    publicationRange: {
      start: Number(scAuthorData['publication-range']['@start']), 
      end: Number(scAuthorData['publication-range']['@end'])},

  }
  // console.log(researcherData);
  
  const researcher = new Researcher(researcherData);
  //disabled for now, it works
  researcher.save()
  .then(()=>{
    console.log(researcher);
  });
  return null;
}

//Gets the basic information about the Researcher:
  //Number of publications
  //Number of Citations
  //
router.get('/getResearchers/', (req, res) => {

    Researcher.find()
    .sort({scopusHIndex: -1})
    .exec((err, researchers) => {
      res.status(200).json(response(researchers));
    })
  });

  router.get('/getResearcher/', (req, res) => {
    var id = req.query.ID;
    Researcher.findOne({scopusID: id})
    .sort({scopusHIndex: -1})
    .exec((err, researcher) => {
        Publication.find({scopusAuthorID: id})
        .exec((er,publications) => {
          //console.log("researcher " + researcher);
          //console.log("Publications " + publications);

          var resData = {
            researcher,
            publications
          }
          res.status(200).json(response(resData));

        })
    })
  });


//Updates the researcher completly 
  //Queries all of the connected databases/APIs
  //Won't do this too often, at most of one per day
router.put('/updateResearcher/', (req, res) => {
  APIS.elsevierAuthorSearch(req.body.params.ID).then(function (data) {
    //console.log("sending back: "+  data);
    // if(data['search-results']['opensearch:totalResults']==0){
    //   res.status(200).json(response(data,"no search results"));
    // }
    // else {
      saveResearcherToDB(data);
      res.status(200).json(response(data));

    // }
  });

  });

// router.get('/recalculate/', (req, res) => {
//     const data = {hello:"World"}
//     res.status(200).json(response({data}))

//   });


  router.get('/*', (req, res) => {
    const resInfo = {hello:"World", Wrong: "paths"}
    res.status(200).json(response({resInfo}))
  });
  

module.exports = router;