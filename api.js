const express=require('express');
const cors=require('cors');
const router=express.Router();
const signin=require('./controllers/signin');
const register=require('./controllers/register');
const insert=require('./controllers/insert');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

/*const knex=knex({
	client:'pg',
	connection:{
		connectionstring:process.env.DATABASE_URL,
		ssl:true,
	}
});*/
 var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'yohan',
    database : 'smartbrain'
  }
});


app.get('/',(req,res)=>
{
	knex.raw("SELECT * FROM public.ruser")
	.then(data=>res.send(data.rows));

	
})
/* sign in*/
app.post('/signin', (req,res,next)=>{signin.handlesignin(req,res,next,knex)});


 
/*REGISTER*/
app.post('/register',(req,res)=>{register.handleregister(req,res,knex)})


/*photo insert */

app.put('/insert',(req,res)=>{insert.handleinsert(req,res,knex)})

/*ERROR HANDLING*/
app.use(function(err,req,res,next){
res.json('error')
})
			  
 app.listen(process.env.PORT || 3001,console.log("yeps"));
 
 /*
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'reactdb'
  }
});
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/register', (req, res) =>
  knex('userrgister').insert({
    name: req.body.name,
	id:null,
	
	
	email:req.body.email
  })
  .then(function() {
    knex.select()
        .from('userrgister')
        .then(function(todos) {
          res.send(todos);
        })
  })
)
app.get('/',(req,res)=>
{
	knex.raw("select * from Persons")
	.then(data=>res.send(data[0]));
})
 app.listen(3001,console.log("yep"));*/