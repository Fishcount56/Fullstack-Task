const { user, userprofile } = require('../../models')

// Get user profile 

exports.userProfile = async(req, res) => {
    try {
        const Profile = await userprofile.findOne({
            where: {
                idUser : req.user.id
            },
            attributes: {
                exclude: ['id','createdAt','updatedAt']
            }
        })
        Profile.userPhoto = process.env.PATH_FILE_USER + Profile.userPhoto
        res.send({
            status: "Success",
            data : {
                Profile
            }
        })
    } catch (error) {
        res.send({
            status: "Error"
        })
    }
}

exports.editProfile = async(req, res) => {
    try {
        const profileEdit = await userprofile.update({
            gender: req.body.gender,
            phoneNumber : req.body.phoneNumber,
            address: req.body.address,
            userPhoto: req.file.filename
        },{
            where : {
                idUser : req.user.id
            }
        })
        res.send({
            status: "Success"
        })
    } catch (error) {
        res.send({
            status: "Error"
        })
    }
}