// {
// 	"sold": 10
// }

module.exports = async function (req, res) {
    var machine = await Machine.find().limit(1)
    machine = machine[0]
    
    req.body['sold'] += machine.sold 

    await Machine.update( { id : machine.id }).set(req.body);

    return res.ok() 
};