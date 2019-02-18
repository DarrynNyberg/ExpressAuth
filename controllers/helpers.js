
function syntEndpointFormatter(data) {
  var code = 400;
  var message = 'YOU SHALL NOT PASS!!!asdf';
  var data = {
    message: 'YOU SHALL NOT PASS!!!'
  };

  if(data.code) {

  } else {
    
  }


  if(data.message) {

  } else {
    var message = data.message;
  }

  return {
      status: {
        code: code,
        message: message
      },
      data: data
     }
}


module.exports.syntEndpointFormatter = syntEndpointFormatter;  
