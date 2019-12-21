const handleregister=function(req, res,knex) {
	if(!req.body.name|| !req.body.email || !req.body.pass)
	{
		return res.status(404).json("FILL ALL THE FIELDS");
	}
	else
	{
	  knex('ruser').insert({
		name: req.body.name,
		email: req.body.email,
		pass:req.body.pass
	  })
	  .then(function() {
		knex.column(['name', 'rank']).select()
			.from('ruser')
			.where((builder) =>
		builder.where('email', req.body.email).where('pass',req.body.pass))
		.then(data=>res.json(data))
		.catch(next);
	  })
	  console.log(req.body.name,req.body.email);
	}
}
  module.exports={
	handleregister:handleregister
};