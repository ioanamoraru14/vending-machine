const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = async function (req, res) {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Wrong body format' })
    } 

    let user = await User.findOne({ email: req.body.email })
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const match = await bcrypt.compare(req.body.password, user.password)

    if (!match) {
        return res.status(400).json({ message: 'Wrong password' })
    }

    let token = jwt.sign({ id: user.id }, process.env.APP_KEY)

    return res.json({ token, user })  
};
