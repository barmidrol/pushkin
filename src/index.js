var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var solver = require('./solver');
var url = 'http://pushkin.rubyroid.by/quiz';
var fs = require('fs');
var token = '';

app.use(bodyParser());
solver.init();

app.route('/quiz')
	.post(function(req, res) {
		//var start = new Date();
		var body = req.body
		var ans = solver.solve(body.level, body.question);
		console.log(body.question);
		res.send('');
		var response = {
			token: token,
			answer: ans,
			task_id: body.id
		};
		//console.log(response);
		request.post(
		    url,
		    { form: response }
		);	
		//console.log(new Date() - start);
		console.log(ans);
	});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});