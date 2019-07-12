import axios from 'axios'

 async function requestElsevier(urlComplement,params){//async here
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
  catch (err){
    console.error(err);
  }

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
      var searchData = requestElsevier(searchComplement,searchParams);
      var metricsData = requestElsevier(metricsComplement,metricsParams);
      var basicData = requestElsevier(basicComplement,basicParams);

   
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

      //Will return good view of researcher once it has been saved
      // .then(function (data) {
      //   //console.log(JSON.stringify(data));
      //   console.log("Data is being passed over, gonna exit");

      //   return data;
      // });
    },
  
    bar: function bar(lorem, ipsum) {
        //code goes here
          return {
          hello: "world",
          lorem: ipsum,
  
        };
      },

    ss: function ss(lorem, ipsum) {
      //code goes here
        return {
        hello: "world",
        lorem: ipsum,

      };
    },
  };