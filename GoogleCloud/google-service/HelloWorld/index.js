/**
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloWorld = function helloWorld (req, res) {
  let name =null;
  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'PUT':
      handlePUT(req, res);
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};


function handlePUT(req, res) {
  //handle put request
    switch (req.get('content-type')) {
    // '{"name":"Maddie"}'
    case 'application/json':
      name = req.body.name;
      break;

    // 'name=Maddie'
    case 'application/x-www-form-urlencoded':
      name = req.body.name;
      break;
  }
  console.log(req.body.message);
  res.status(200).send('PUT Success: ' + `Hello ${name || 'World'}!`);
};

function handleGET(req, res) {
  //handle get request
    switch (req.get('content-type')) {
    // '{"name":"Maddie"}'
    case 'application/json':
      name = req.body.name;
      break;

    // 'name=Maddie'
    case 'application/x-www-form-urlencoded':
      name = req.body.name;
      break;
  }
  console.log(req.body.message);
  res.status(200).send('GET Success: ' + `Hello ${name || 'World'}!`);
};
