import Department from '../models/department';
import response from '../response';
import altmetrics from '../altmetricFunctions'
import Grant from '../models/grant';
const express = require('express');

const router = express.Router();

//Gets the basic information about the department:
  //Top Journals where faculty are publishing
  //Top Journals in field 
  //Top Journals Faculty are citing
  //Researchers involved
  //etc
  //Last date of update
router.get('/departmentOverview/', (req, res) => {
  Department.find()
  .exec((err, department)=>{
    res.status(200).json(department[0]);
  })
  

  });

  router.get('/getAllGrants/', (req, res) => {
    Grant.find()
    .exec((err, grants)=>{
      res.status(200).json(grants);
    })
    
  
    });

    router.get('/getDepartmentMentions/', (req, res) => {
      altmetrics.departmentMentions().then((data)=>{
        return res.status(200).json(data);

      })
    })
  


  //In the front end have some animation or something to indicate it is still updating.
//Updates the department completly 
  //Queries all of the connected databases/APIs
  //Won't do this too often, at most of one per day
router.put('/updateDepartment/', (req, res) => {
    const data = {hello:"World"}
    res.status(200).json(response({data}))

  });

  //Export department Report???
  router.put('/exportReport/', (req, res) => {
    const data = {hello:"World"}
    res.status(200).json(response({data}))

  });


// router.get('/recalculate/', (req, res) => {
//     const data = {hello:"World"}
//     res.status(200).json(response({data}))

//   });


  router.get('/*', (req, res) => {
    const resInfo = {hello:"World", Wrong: "path"}
    res.status(200).json(response({resInfo}))
  });
  

module.exports = router;