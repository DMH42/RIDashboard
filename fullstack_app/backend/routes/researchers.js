//import Researcher from '../models/researcher';
import response from '../response';
import Researcher from '../models/researcher'
import elsevier from '../elsevierFunctions'
import dimensions from '../dimensionsFunctions'

import Publication from '../models/publication'
import Grant from '../models/grant';


const express = require('express');

const router = express.Router();



function saveResearcherToDB(data){
  // console.log(data[1]['author-retrieval-response'][0]);
  var searchData = data[0]['search-results'];
  elsevier.saveDocuments(searchData);
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
      var publications = null;
      var grants = null;

        var pubPromise = Publication.find({scopusAuthorID: id})
        .then((pubs) => {
          publications = pubs;
        })

        var grantPromise =  Grant.find({researcherID:researcher.dimensionsID})
        // .exec((er,gr) => {
        //   grants = gr;
        // })
        .then((grs)=>{
          grants = grs
        })
        // console.log(grantPromise)

        Promise.all([pubPromise, grantPromise]).then(vals => {

          // console.log(grants);
          var resData = {
            researcher,
            publications,
            grants

          }
          return res.status(200).json(response(resData));

    
        });
    })
  });


//Updates the researcher completly 
  //Queries all of the connected databases/elsevier
  //Won't do this too often, at most of one per day
  router.post('/updateResearcher/', (req, res) => {
    elsevier.elsevierAuthorSearch(req.body.params.ID).then(function (data) {
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




  router.post('/updateGrants/', (req, res) => {
    // console.log(req.body);//get the dimensions ID
    // console.log(req.body)//get the ID of the researcher in the db
      // Researcher.findOneAndUpdate({_id:req.body.mongoID},
      //   {
      //     $set: {
      //       dimensionsID: req.body.dimensionsID,
      //     }
      //   },
      //    { new: true },
      //   )
      // .exec((err, researcher)=>{
      //   console.log(researcher);
      //   var grantCount = dimensions.getGrants(req.body.dimensionsID).then(() =>{
      //     res.status(200).json(grantCount);
      //   });
      // });
      dimensions.getGrants(req.body.dimensionsID).then( (grantData)=>{
        console.log("grantDAta: " +  grantData);

        Researcher.findOneAndUpdate({_id:req.body.mongoID},
          {
            $set: {
              dimensionsID: req.body.dimensionsID,
              grantCount: grantData.grantCount,
              grantTotal: grantData.grantTotal,
            }
    
          },
           { new: true },
          )
        .exec((err, researcher)=>{
          console.log(researcher);
          res.status(200).json(grantData);
        });
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