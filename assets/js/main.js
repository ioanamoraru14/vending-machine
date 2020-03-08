function Machine() {
	this.money = 0
	this.card = false
}

Machine.prototype = {
	setMoney(amount) {
		this.money = amount
		document.getElementById('pay').innerHTML = amount
	},

	loadProducts: function(products) {
		for (let i = 0; i < products.length; i++) {
			this[products[i].name] = [products[i]]
		}
	},

	countAllSodas() {
		let total = 0
		let self = Object.keys(this)

		for (let i = 2; i < self.length; i++) {
			let name = Object.keys(this)[i]
			total += Number(this[name][0].amount)
		}

		return total
	},

	update() {
		let total = this.countAllSodas()
		let text = `${total} products`

		this.updateIndividualSodas()
		this.Products()
		total > 0 ? (document.getElementById('productCount').innerHTML = text) : (document.getElementById('productCount').innerHTML = 'Empty')
	},

	turnOn() {
		document.getElementById('pay').innerHTML = this.money

		this.update()
	},

	addChange(amount = 0) {
		this.money += amount
		document.getElementById('pay').innerHTML = this.money
	},

	purchase(node) {
		let self = Object.keys(this)

		for (let i = 2; i < self.length; i++) {
			if (node.firstElementChild.innerHTML === this[self[i]][0].code) {
				let item = this[self[i]][0]

				if (item.amount > 0) {
					if (this.card) {
						api.post('buy', { product: item.id, payment_method: 1 }).then(() => {
							this[self[i]][0].amount--
							this.resetChange(this.money)
							alert(`You bought: ${item.name}`)
						})
					} else if (this.money >= Number(item.price)) {
						api.post('buy', { product: item.id, payment_method: 0 }).then(() => {
							this[self[i]][0].amount--
							let newAmount = this.money - Number(item.price)
							this.resetChange(newAmount)
							alert(`You bought: ${item.name}`)
						})
					} else {
						alert(`You don't have enough money!`)
					}
				} else {
					alert(`${name} is out of stock!`)
					this.resetChange(this.money)
				}

				this.update()
			}
		}
	},

	resetChange(amount = 0) {
		this.money = amount

		this.update()
		this.addChange()
	},

	updateIndividualSodas() {
		let displayBox = document.getElementById('displayBox')
		let self = Object.keys(this)
		let displayArr = []

		displayBox.innerHTML = ''

		for (let i = 1; i < self.length; i++) {
			displayArr.push(self[i])
		}

		for (let i = 2; i < displayArr.length + 1; i++) {
			let div = document.createElement('div')
			let amount = this[self[i]][0].amount
			let name = this[self[i]][0].name

			div.className = 'display'
			div.innerHTML = `${name} (${amount})`
			displayBox.append(div)
		}
	},

	Products() {
		let self = Object.keys(this)

		for (let i = 2; i < self.length; i++) {
			let name = this[self[i]][0].name.toLowerCase()
			document.getElementById(`${name}Box`).innerHTML = ''

			for (let j = 0; j < this[self[i]][0].amount; j++) {
				let div = document.createElement('div')
				let para = document.createElement('p')
				para.className = 'product-text'
				para.innerHTML = name
				div.className = `product ${name}`
				div.append(para)
				document.getElementById(`${name}Box`).prepend(div)
			}
		}
	},

	addListeners(nodeList) {
		for (let i = 0; i < nodeList.length; i++) {
			switch (nodeList[i].classList.value) {
				case 'button':
					nodeList[i].addEventListener('click', function() {
						machine.purchase(this)
					})
					break
				case 'coin-outter':
					nodeList[i].addEventListener('click', function() {
						let amount = Number(this.firstElementChild.innerHTML)
						machine.addChange(amount)

						api.put('/add-money', { sold: amount })
					})
					break
				default:
					break
			}
		}
	}
}

function Item(id, name, amount, price, code) {
	this.id = id
	this.name = name
	this.amount = amount
	this.price = price
	this.code = code
}

Item.prototype = {
	productCount: function() {
		return `We have ${this.amount} ${this.name}(s) left in stock`
	}
}

const api = axios.create({
	baseURL: 'https://hackitall.herokuapp.com/'
})

let machine = new Machine()
let items = []

createMachine()
createChart()

function createMachine() {
	api.get('machine/1').then(response => {
		machine.setMoney(response.data.sold)

		let products = response.data.products
		for (product of products) {
			let item = new Item(product.id, product.name, product.stock, product.price, product.location)
			$(`#admin-product-${product.name.toLowerCase()}`).val(product.stock)
			items.push(item)
		}

		document.getElementById('return').addEventListener('click', function() {
			machine.resetChange()
		})

		machine.addListeners(document.querySelectorAll('.button'))
		machine.addListeners(document.querySelectorAll('.coin-outter'))
		machine.loadProducts(items)
		machine.turnOn()
	})
}

$('.rest-buttom').click(function() {
	api.get('change').then(response => {
		alert(`You have received ${response.data.sold}$`)
		machine.setMoney(0)
	})
})

$('.card-buttom').click(function() {
	machine.card = !machine.card

	if (machine.card) {
		$('#card-button').addClass('red')
	} else {
		$('#card-button').removeClass('red')
	}
})

$('#update-stocks').click(function() {
	let requests = []
	for (item of items) {
		requests.push(api.patch(`/product/${item.id}`, { stock: $(`#admin-product-${item.name.toLowerCase()}`).val() }))
	}

	axios.all(requests).then(function() {
		createMachine()
	})
})

function createChart() {
	var ctx = $('#per-day-chart')[0].getContext('2d')

	api.get('statistics?nr_days=7').then(function(response) {
		let labels = []
		let values = []

		for (let [key, value] of Object.entries(response.data)) {
			labels.push(key)
			values.push(value)
		}

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Tranzactii',
						data: values,
						backgroundColor: 'rgba(153,255,51,0.4)'
					}
				]
			}
		})
	})
}
