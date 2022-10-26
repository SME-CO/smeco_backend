var axios = require('axios');

exports.sendSMS = async (to, message) => {
  const userId = 104663;
  const apiKey = 'nuakghkp6jyx0kdii';
  const senderId = 'ozoneDEMO';

  const URL = `http://send.ozonedesk.com/api/v2/send.php?user_id=${userId}&api_key=${apiKey}&sender_id=${senderId}&to=${to}&message=${message}`;

  const request = {
    'method': 'get',
    'url': URL,
    'headers': {
    }
  };

  axios(request).then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
    .catch(function (error) {
      console.log(error);
    });
}
