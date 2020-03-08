module.exports = async function (req, res) {
    let machine = await Machine.find().limit(1)
    machine = machine[0]

    await Machine.update({id: machine.id}).set({'sold': 0})

    return res.json({"sold": machine.sold})
};