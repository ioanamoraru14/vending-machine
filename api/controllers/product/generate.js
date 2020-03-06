module.exports = async function (req, res) {

    let product = {
        'name': 'Avira Prime',
        'price': 75,
        'stock': 0
    };
    await Product.create(product)

    product['name'] = 'Antivirus PRO'
    product['price'] = 35
    await Product.create(product)

    product['name'] = 'Phantom VPN'
    product['price'] = 50
    await Product.create(product)

    product['name'] = 'Password Manager'
    product['price'] = 20
    await Product.create(product)

    product['name'] = 'Optimizer'
    product['price'] = 10
    await Product.create(product)

    product['name'] = 'System Speedup'
    product['price'] = 25
    await Product.create(product)

    return res.ok() 
};