function response(payload, errorMsg) {
  if (errorMsg!=undefined){
    return {
      meta: {
        date: Date.now(),
        responseType: 'JSON',
      },
      payload,
      error: errorMsg,
    };
  }
  else {

      return {
        meta: {
          date: Date.now(),
          responseType: 'JSON',
        },
        payload,
        error: null,
      };
    
  }
  }
    

  
  export default response;