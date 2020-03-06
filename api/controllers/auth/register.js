const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = async function (req, res) {

    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Wrong body format' })
    }

    let user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).json({ message: 'Email already exists' })
    }

    bcrypt.hash(req.body.password, saltRounds, async function(error, hash) {
        if (error) {
            return res.status(400).json({ message: 'There was an error' })
        }

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })

        return res.status(200).json({ message: 'User created' })
    })

};
