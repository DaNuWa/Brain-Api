const handlesignin= function(req,res,next,knex) {
	if(!req.body.email || !req.body.pass)
	{
		return res.status(404).json("FILL ALL THE FIELDS");
	}
	else
	{
		knex.column(['name', 'rank']).select().from('ruser')
		.where((builder) =>
		builder.where('email', req.body.email).where('pass',req.body.pass))
		.then(data=>{
			if(data.length===0){
			res.json('error')}
			else{
			res.json(data)}
		})
		.catch(next);
		console.log("hi");
	
	}
}

module.exports={
	handlesignin:handlesignin
};