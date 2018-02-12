let express = require('express');
let Pool = require('pg').Pool;
let bodyParser = require('body-parser');

const path = require('path');
const app = express();

var config = {
host: 'localhost',
      user: 'joseph',
      password: '1419600',
      database: 'classmem'
};

var pool = new Pool(config);

app.set('port', (8080));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: 'true'}));
app.get('/api', async (req, res) => {
		var Classes = req.query.workshop;
		var add = req.query.add;
		if(req.query.workshop){
		try{	
		const response = await pool.query('SELECT * FROM students WHERE class =$1',[Classes]);		
		var attendees = response.rows.map(function(item){
				return (item.firstname);})	
		res.json({'Attendees' : attendees});
		}catch(err){
		console.error("ERROR running query " +err);
		}}
		else{
		try{
		const response = await pool.query('SELECT * FROM students');
		res.json({'Workshops': response});
		}
		catch(err){
		console.error("ERROR running query " + err);
		}}});

app.post('/api', async (req, res) => {

		console.log(req.body);

		var student = req.body.student;
		var workshop = req.body.workshop;

		if(!student || !workshop){
			res.json({error:'papameters not given'});
		}
		else{
			try{
			var check = await pool.query('select * FROM students where name = $1 and workshop = $2',[student, workshop]);		
var refcheck =check.rows.map(function(item){return (item.firstname);})

console.log("THis si check");			
console.log(check.rowCount);			
if(check.rowCount==0){
		var response = await pool.query('INSERT INTO students values ($1,$2)',[student, workshop]);
			res.json({status: 'successfull'	});
		}
		else{res.json({status:'entry already exists' });
		}		
		}catch(e){
		console.error("ERROR RUNNING Insert " + e);
		}}});

app.listen(app.get('port'), () => {
		console.log('Program Running');
		});
