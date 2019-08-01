import axios from 'axios'
import crypto from 'crypto'

// import elsevier from './elsevierFunctions'




async function requestAltmetic(query) {//async here
    var api_secret = '1f829e18a1604ccaaeac916d3c8c4295';
    var filters = 'q|pandemic|scope|all|timeframe|3m|type|article|dataset'//this would be the query
    var hash = crypto.createHmac('sha1', api_secret).update(filters).digest('hex')
    var key = '6655bc8733284a45a8a1a41fcc3fb271'
    var params = {
        digest: hash,
        key
    }
    try {
        const url = 'https://www.altmetric.com/explorer/api/research_outputs';

        // console.log(res.data);

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



module.exports = {
    departmentMentions: async function foo(researcherID) {
        var key = '6655bc8733284a45a8a1a41fcc3fb271'
        var params = {
            digest: "aa0502fe473dc19bb1d72de37606683aa6862a2d",
            filters: "department_id|83d9096f-1e0c-4f5a-856d-dfaf7d92c7ba%3Adepartment%3A19ad65e931f67b8de0725b8848a8a25f",
            key
        }
        try {
            const url = 'https://www.altmetric.com/explorer/api/research_outputs/mentions?digest=aa0502fe473dc19bb1d72de37606683aa6862a2d&filter%5Bdepartment_id%5D=83d9096f-1e0c-4f5a-856d-dfaf7d92c7ba%3Adepartment%3A19ad65e931f67b8de0725b8848a8a25f&key=6655bc8733284a45a8a1a41fcc3fb271';

            // console.log(res.data);

            let res = await axios.get(url);
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

    },

    saveDocuments: function bar(documents) {

    },



    bootProcess: async function ok() {

        // requestAltmetic("hello")
    },

    deptmntStatUpdate: function ss() {

    },
};
