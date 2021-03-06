var eatAuth = require(__dirname + '/../lib/eat_auth');
var express = require('express');
var User = require(__dirname + '/../models/user');
var retaindRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var addToDb = require(__dirname + '/../lib/add_to_db');
var time = require(__dirname + '/../lib/time');
var httpBasic = require(__dirname + '/../lib/http_basic');

retaindRoute.post('/personal', jsonParser, eatAuth, function(req, res) {
  addToDb(req, res, {pInfo: req.body.pInfo});
});

retaindRoute.get('/personal', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.pInfo);
  });
});

retaindRoute.get('/ambition', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.ambitions);
  });
});

retaindRoute.post('/ambition', jsonParser, eatAuth, function(req, res) {
  var dueDate;
  if(req.body.dueDate === 'day') dueDate = time.plusDay();
  if(req.body.dueDate === 'week') dueDate = time.plusWeek();
  if(req.body.dueDate === 'month') dueDate = time.plusMonth();
  var input = {ambition: req.body.ambitions, dueDate: dueDate};
  addToDb(req, res, {ambitions: input});
});

retaindRoute.post('/dashload', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.ambitions);
  });
});

retaindRoute.post('/LDR', jsonParser, eatAuth, function(req, res) {
  addToDb(req, res, {LDR: req.body.LDR});
});

retaindRoute.get('/LDR', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.LDR);
  });
});

retaindRoute.get('/user_info', jsonParser, eatAuth, function(req, res) {
  User.findOne( {username: req.user.username}, function(doc) {
    res.json(doc);
  });
});