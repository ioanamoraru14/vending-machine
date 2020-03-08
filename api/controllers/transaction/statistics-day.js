module.exports = async function(req, res) {
	let today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today_format = dd +'/'+ mm +'/'+ yyyy;

	let dict = {}
	dict[today_format] = 0

	var i;
	let last = today;
	for (i = 0; i < req.query.nr_days - 1; i++) { 
		last = new Date(last - (24 * 60 * 60 * 1000));
		dd = String(last.getDate()).padStart(2, '0');
		mm = String(last.getMonth() + 1).padStart(2, '0');
		yyyy = last.getFullYear();
		last_format = dd +'/'+ mm +'/'+ yyyy;
		dict[last_format] = 0
	}

	start = new Date(today.getTime() - (req.query.nr_days * 24 * 60 * 60 * 1000));
	let transactions = await Transaction.find().where({ "createdAt" : { ">": start.getTime() } });

	for (item of transactions) {
		let date = new Date(item.createdAt * 1000);
		dd = String(last.getDate()).padStart(2, '0');
		mm = String(last.getMonth() + 1).padStart(2, '0');
		yyyy = last.getFullYear();
		date = dd +'/'+ mm +'/'+ yyyy;
		dict[date]++;
	}

	return res.json(dict)
}