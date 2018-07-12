"use strict"
//express_demo.js 文件
var express = require('express');
var formidable = require('formidable');
var app = express();
var storage = new Object();
 
app.get('/api/compute', function (req, res) {
	if(req.headers["hw-token"] !== '881cb828b8f3d84ce21150020c3dd6c086a6e49a'){
		res.sendStatus(403);
	}
	else{
   // res.send('Hello World');
	   let query = req.query;
	   let a = new Object();
	   switch (query.type){
	   	case 'ADD':
	   	console.log("add");
	   		a.ans = parseInt(query.firstParam)+parseInt(query.secondParam);
	   		res.send(a);
	   		res.end();
	   		break;
	   	case 'SUB':
	   	console.log("sub");
	   		a.ans = parseInt(query.firstParam)-parseInt(query.secondParam);
	   		res.send(a);
	   		res.end();
	   		break;
	   	case 'MUL':
	   	console.log("mul");
	   		a.ans = parseInt(query.firstParam)*parseInt(query.secondParam);
	   		res.send(a);
	   		res.end();
	   		break;
	   	case 'DIV':
	   	console.log("div");
	   		a.ans = parseInt(parseInt(query.firstParam)/parseInt(query.secondParam));
	   		res.send(a);
	   		res.end();
	   		break;
	   }
   }
})
// app.post('/api/pair',function(req,res){
// 	if(req.headers["hw-token"] !== '1234567890'){
// 		res.send(403);
// 	}
// 	else{
// 	let form = new formidable.IncomingForm();
// 	form.parse(req, function(err, fields, files) {  
// 				let v = fields;
// 				storage[fields.key] = fields.value;
// 				console.log(fields);
// 				console.log(storage);
// 				res.end();
//         });
// 	}
// })

// app.get('/api/pair',function(req,res){
// 	if(req.headers["hw-token"] !== '1234567890'){
// 		res.send(403);
// 	}
// 	else{
// 		let query = req.query;
// 		console.log(query);
// 		if(storage[query.key]!==undefined){
// 			console.log("found");
// 			let a = new Object();
// 			a.value = storage[query.key];
// 			console.log(a);
// 			res.send(a);
// 			res.end();
// 		}
// 		else{
// 			console.log("noneget");
// 			res.sendStatus(404);
// 			res.end();
// 		}
// 	}

// })

app.use('/api/pair',function(req,res){
	if(req.headers["hw-token"] !== '881cb828b8f3d84ce21150020c3dd6c086a6e49a'){
		res.sendStatus(403);
	}
	else{
		console.log("other");
		let query = req.query;
		switch (req.method){
			case "DELETE":{
				if(storage[query.key] !== undefined){
					console.log(storage);
					delete storage[query.key];
					console.log(storage);
					res.end();
					break;
				}
				else{
					console.log("none404");
					res.sendStatus(404);
					res.end();
					break;
				}
			};
			case "GET":{
				let query = req.query;
				console.log(query);
				if(storage[query.key]!==undefined){
					console.log("found");
					let a = new Object();
					a.value = storage[query.key];
					console.log(a);
					res.send(a);
					res.end();
				}
				else{
					console.log("noneget");
					res.sendStatus(404);
					res.end();
				}
			};
			case "POST":{
				let form = new formidable.IncomingForm();
				form.parse(req, function(err, fields, files) {  
							let v = fields;
							storage[fields.key] = fields.value;
							console.log(fields);
							console.log(storage);
							res.end();
			        });
			}

			
		}
	}
})

var server = app.listen(12306,function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("http://%s:%s", host, port)
 
})