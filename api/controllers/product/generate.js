module.exports = async function(req, res) {
	await Product.destroy({})
	await Machine.destroy({})

	let machine = { sold: 0 }
	await Machine.create(machine)

	await Product.create({ name: 'Avira Prime', price: 75, stock: 3, location: 'A1' })
    await Product.create({ name: 'Antivirus PRO', price: 35, stock: 3, location: 'A2' })
    await Product.create({ name: 'Phantom VPN', price: 50, stock: 5, location: 'B3' })
    await Product.create({ name: 'Password ManagerO', price: 20, stock: 3, location: 'C4' })
    await Product.create({ name: 'Optimizer', price: 10, stock: 5, location: 'D2' })
    await Product.create({ name: 'System Speedup', price: 25, stock: 4, location: 'D4' })

	return res.ok()
}
