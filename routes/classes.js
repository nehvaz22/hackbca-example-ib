var express = require('express');
var router = express.Router();
let db = require("../db/db")

/* GET events page. */

let select_classsql = `SELECT
class.class_id,
class.name,
class.date,
class.duration
FROM
class
ORDER BY
class.name`

router.get('/', async function(req, res, next) {
  let storeclass = await db.queryPromise(select_classsql)
  
  res.render('classes', { title: 'Classes', style: "tables", classes: storeclass});
});

router.get('/create', function(req, res, next) {
  res.render('classform', {title: 'Create New Class', style: "newclass"})
})


let select_oneclass = `SELECT
class_id,
name,
date,
duration
FROM
class
where class_id = ?`

let select_clients = `SELECT
first_name,
last_name,
email,
phone_number,
home_address
FROM
client
WHERE
client.class_id = ?
ORDER BY
client.last_name`

router.get('/:class_id', async function(req, res, next) {
  req.params.class_id
  let array_with_oneclass = await db.queryPromise (select_oneclass, [req.params.class_id])
  let oneclass = array_with_oneclass[0]
  console.log(oneclass)
  let array_with_clients = await db.queryPromise (select_clients,[req.params.class_id])
  console.log(array_with_clients)

  res.render('class', {title: 'Class', style: "tables", oneclass, clients:array_with_clients})
  
});


let classquery = `INSERT INTO class
(name, date, duration)
VALUES (?, STR_TO_DATE(?, "%m-%d-%Y"), ?);`

router.post('/add', async function(req, res, next) {
  await db.queryPromise (classquery, [req.body.event_name, req.body.event_date, req.body.event_duration])
  res.redirect("/classes")
});
module.exports = router;


// router.get('/modify/:class_id', function(req, res, next) {
//   let event_id = req.params.event_id;
//   // let event;
//   // for(int i = 0; i < events_data.length; i++) {
//   //   if (events_data[i].event_id === event_id)
//   //     event = events_data[i];
//   // }
//   //alternatively
//   let event = events_data.find(function(evt){ return evt.event_id == event_id});
//   if (event === undefined ){
//     next(); //pass along, send 404
//   }
//   else {
//     res.render('classform', { title: 'Modify Class', style: "newclass", event: event});
//   }

// })