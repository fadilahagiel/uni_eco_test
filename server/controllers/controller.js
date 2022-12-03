const User = require(`../models/user`)
const { isEmail } = require('validator')

class Controller {
    static async showAllUsers(req, res, next) {
        try {
            const { sort, order } = req.query
            let users = []
            if (sort == `addr` && order == 1) {
                users = await User.find()
                users.sort((a, b) => {
                    return b.addr.length - a.addr.length
                })
            } else if (sort == `addr` && order == -1) {
                users = await User.find()
                users.sort((a, b) => {
                    return a.addr.length - b.addr.length
                })
            }  else {
                users = await User.find().sort([[sort, order]])
            }
            users = users.map((el) => {
                let address = []
                el.addr.forEach(add => {
                    let { street, house, city, country } = add
                    address.push([street + ` ` + house + `, ` + city + ` ` + country])
                })
                address = address.join(` `)
                return {
                    _id: el._id,
                    name: `${el.firstName} ${el.lastName}`,
                    gender: el.gender,
                    address
                }
            })
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async showOneUser(req, res, next) {
        try {
            const { _id } = req.params
            const user = await User.findOne({_id})
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }  

    static async updateUser(req, res, next) {
        try {
            const { _id } = req.params
            const { email, firstName, lastName, gender, addr } = req.body
            console.log(email, 'ini email');
            if (!isEmail(email)) throw { name: `invalid_email`}
            await User.updateOne({ _id }, { email, firstName, lastName, gender, addr })

            res.status(200).json({message : "Update user successful"})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller