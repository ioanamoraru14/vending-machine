module.exports = async function (req, res) {
    var machine = await Machine.findOne({id: 1})

    await Machine.update({id: 1}).set({'sold': 0})

    return res.json({"sold": machine.sold})
};