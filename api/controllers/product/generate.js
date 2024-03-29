module.exports = async function(req, res) {
	await Product.destroy({})
	await Machine.destroy({})

	let machine_prop = { sold: 0 }
	let machine = await Machine.create(machine_prop).fetch()

	await Product.create({ name: 'Prime', price: 75, stock: 3, location: 'A1', machine: machine.id })
    await Product.create({ name: 'Antivirus', price: 35, stock: 3, location: 'A2', machine: machine.id })
    await Product.create({ name: 'Phantom', price: 50, stock: 5, location: 'B3', machine: machine.id })
    await Product.create({ name: 'Password', price: 20, stock: 3, location: 'C4', machine: machine.id })
    await Product.create({ name: 'Optimizer', price: 10, stock: 5, location: 'D2', machine: machine.id })
    await Product.create({ name: 'Speedup', price: 25, stock: 4, location: 'D4', machine: machine.id })

	return res.ok()
}
