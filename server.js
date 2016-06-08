var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');

var connect= mysql.createConnection({
	host:'192.168.2.6',
	user:'Abhay',
	password:'',
	database:'property_managment'
});
var insertRecord ="INSERT INTO contact_master(`f_name`) values(?)";
connect.connect();
var app = express(); 
app.use(express.static(__dirname+"/assets"));
 app.use(bodyParser.urlencoded({ extended:"false"}));
 app.use(bodyParser.json());
app.get("/select",function(req,res){
	//var data=[];
	connect.query("SELECT * FROM contact_master",function(err,rows,fields){
		if(!err){
			res.json(rows);
		}else{
			console.log("error"+err);
		}
	});
	
});

app.post("/insert",function(req,res){	
  username = req.body.name;
	connect.query(insertRecord,[username]);
			res.end('record inerted...');
		    

});	
app.get("/delete/:id",function(req,res){
	mId=req.params.id;
	connect.query("DELETE FROM contact_master WHERE contact_id=?",[mId]);
	res.end( 'record deleted...');
});

app.listen(3000);

console.log("server listen at http://localhost:3000/");