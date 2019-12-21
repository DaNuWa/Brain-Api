 const handleinsert=function(req, res,knex) {
	knex('ruser').where('email',req.body.email)
    .update({
    rank:parseInt(req.body.r)+1
  })
  .then(function()
  {
	  	knex.column(['name', 'rank']).select().from('ruser')
     	.where((builder) =>
	    builder.where('email', req.body.email))
		.then(data=>res.json(data))
  })
 }
  
   module.exports={
	handleinsert:handleinsert
};