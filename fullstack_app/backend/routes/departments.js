import Department from '../models/department';
import response from '../response';
import APIS from '../apiFunctions'
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
  


  });

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