// {
// 	"product": 4,
// 	"payment_method": 0
// }

module.exports = async function (req, res) {
    var product = await Product.findOne({id: req.body.product})

    if (product.stock <= 0) {
        return res.status(400).json({ message: 'The item is not in stock!' })
    }

    var machine = await Machine.findOne({id: 1})
    if (req.body.payment_method == 0 && machine.sold < product.price) {
        return res.status(400).json({ message: 'You do not have enough money!' })
    }

    if (req.body.payment_method == 0) {
        var data = {sold: machine.sold - product.price}
        await Machine.update( { id :1 }).set(data)
    }

    var new_stock = {stock: product.stock - 1}
    await Product.update( {id: product.id} ).set(new_stock)
    await Transaction.create(req.body)

    return res.ok() 
};