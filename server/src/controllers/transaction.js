const { transaction, user } = require('../../models')
const { Sequelize, sequelize } = require('../../models') 

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body
        const newTransaction = await transaction.create({
            ...data,
            idUser: req.user.id,
            transferProof: req.file.filename,
        })
        res.send({
            status:"Success",
            message:{
                newTransaction
            }
        })
    } catch (error) {
        res.send({
            status:"Failed",
            message:"Server Error"
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        let transactions = await transaction.findAll({
            include: [
                {
                    model: user,
                    as: "User",
                    attributes:{
                        exclude:['email','password','role','createdAt','updatedAt']
                    }
                }
            ],
            attributes:{
                exclude:['createdAt','updatedAt','approveDate','overDate']
            }
        })

        transactions = JSON.parse(JSON.stringify(transactions));
        transactions = transactions.map((item) => {
            return { ...item, transferProof: process.env.PATH_FILE_TRANSACTION + item.transferProof };
          });
        res.send({
            status:"Success",
            transactions
        })  
    } catch (error) {
        console.log(error)
        res.send({
            status:"Failed",
            message: "Server Error"
        })  
    }
}

exports.getTransaction = async (req, res) => {
    try {
        let Transaction = await transaction.findOne({
            where:{
                idUser : req.user.id
            },
            attributes:{
                exclude:['createdAt','updatedAt','approveDate','overDate']
            }
        })

        Transaction = JSON.parse(JSON.stringify(Transaction));
        Transaction = {
                ...Transaction, 
                transferProof : process.env.PATH_FILE_TRANSACTION + Transaction.transferProof
        }
        res.send({
            status: "Success",
            Transaction:{
                Transaction
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"Failed",
            message:"Server Error"
        })
    }
}

exports.editTransaction = async (req, res) =>{
    const { id } = req.params
    let approveDate = new Date()
    let overDate = new Date(approveDate)
    overDate.setDate(approveDate.getDate() + 30)
    var diffDays = parseInt((overDate - approveDate) / (1000 * 60 * 60 * 24))
    try {
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

        const checkPaymentStatus = await transaction.findOne({
            where: {
                id
            }
        })

        const isApprove = checkPaymentStatus.paymentStatus

        if(isApprove != 'Pending'){
            return res.status(403).send({
                status: "Forbidden",
                message: "This user Payment Status is still activate"
            })
        }

        const Update = await transaction.update(
        {
            approveDate: approveDate,
            overDate: overDate,
            paymentStatus: "Approve",
            remainActive: diffDays,
            userStatus: "Active"
        },
        {
            where: {
                id
            }
        }
        )
        res.send({
            status:"Success",
            Update
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:"Failed"
        })
    }
}