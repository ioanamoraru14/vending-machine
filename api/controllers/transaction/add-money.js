// {
// 	"sold": 10
// }

module.exports = async function (req, res) {
    var machine = await Machine.findOne({id: 1})
    
    req.body['sold'] += machine.sold 

    await Machine.update( { id :1 }).set(req.body);

    return res.ok() 
};