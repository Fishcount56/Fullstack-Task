const { user, transaction, book, userbook} = require('../../models')

exports.addBookList = async(req, res) => {
    try {
        const { idBook } = req.params
        // Check user status first
        const CheckUserStatus = await transaction.findOne({
            where: {
                idUser : req.user.id
            },
            attributes:{
                exclude:['createdAt','updatedAt','approveDate','overDate']
            }
        })
        let UserStatus = JSON.parse(JSON.stringify(CheckUserStatus))
        if(UserStatus.userStatus != 'Active'){
            return res.status(400).send({
                status: "Failed",
                message: "You need to subscribe first to add this book to your list"
            })
        }
        const checkBookAlreadyAdded = await userbook.findOne({
            where: {
                idUser : req.user.id,
                idBook : req.params.id
            },
            attributes : {
                exclude : ['id','createdAt','updateAt']
            }
        })
        let checkBook = JSON.parse(JSON.stringify(checkBookAlreadyAdded))
        if(checkBook != null){
            return res.status(400).send({
                status : "Failed",
                message: "This book is already in your list"
            })
        }
        const AddBookToList = await userbook.create({
            idUser : req.user.id,
            idBook : req.params.id
        })
        res.send({
            status: "Success",
            Data : {
                AddBookToList
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

exports.UserBookList = async(req, res) => {
    try {
        const UserBooks = await userbook.findAll({
            where: {
                idUser : req.user.id
            },
            attributes: {
                exclude: ['idUser','idBook','createdAt','updatedAt']
            },
            include: [
            {
                model: user,
                as: "UserOwner",
                attributes: {
                    exclude:['email','password','role','createdAt','updatedAt']
                }
            },
            {  
                model: book,
                as: "BookOwned",
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            }]
        })
        const UserBooksList = JSON.parse(JSON.stringify(UserBooks))
        // console.log(UserBooksList)
        res.send({
            status: "Success",
            UserBooksList
        })
    } catch (error) {
        console.log(error)
        res.send({
            status : "Failed"
        })
    }
}