var express = require('express');
var router = express.Router();

const clients_data = require('../data/dummy_projects')

/* GET projects page. */
router.get('/', function(req, res, next) {
  res.render('clients', { title: 'List of Clients', style: "tables", clients : clients_data});
});

router.get('/create', function(req, res, next) {
  res.render('clientform', {title: 'Create New Client', style: "newclient"})
})

router.get('/modify/:client_id', function(req, res, next) {
  let client_id = req.params.client_id;
  // let project;
  // for(int i = 0; i < projects_data.length; i++) {
  //   if (projects_data[i].project_id === project_id)
  //     project = projects_data[i];
  // }
  //alternatively
  let client = clients_data.find(function(evt){ return evt.client_id == client_id});
  if (client === undefined ){
    next(); //pass along, send 404
  }
  else {
    res.render('clientform', { title: 'Modify Client', style: "newclient", client: event});
  }

})

router.get('/:client_id', function(req, res, next) {
  let client_id = req.params.client_id;
  // let project;
  // for(int i = 0; i < projects_data.length; i++) {
  //   if (projects_data[i].project_id === project_id)
  //     project = projects_data[i];
  // }
  //alternatively
  let client = clients_data.find(function(evt){ return evt.client_id == client_id});
  if (client === undefined ){
    next(); //pass along, send 404
  }
  else {
    res.render('client', { title: client.client_name, style: "tables", client: client});
  }
});

module.exports = router;