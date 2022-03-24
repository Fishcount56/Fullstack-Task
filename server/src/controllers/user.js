const jwt = require('jsonwebtoken')
const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes : {
                exclude : ['password','createdAt','updatedAt','role']
            }
        })
        res.send({
            status: "Success",
            data: {
                users
            }
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: "Server Error"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        // Try only as admin
        const checkUser = await user.findOne({
            where: {
                id: req.user.id
            },
            attributes: {
                exclude: ['updatedAt','createdAt','password'] 
            }
        })

        const asAdmin = checkUser.role

        if(asAdmin != 'admin'){
            return res.status(403).send({
                status: "Forbidden",
                message: "You have no right for this access"
            })
        }
        const { id } = req.params
        await user.destroy({
            where: {
                id
            }
        })
        res.send({
            status: "Success",
            message: `User with id ${id} has deleted`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status : "Failed",
            message : "Server Error"
        })
    }
}