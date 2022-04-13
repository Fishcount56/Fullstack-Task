const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/books")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
    }
})

const fileFilter = function (req, file, cb) {
    if(!file.originalname.match(/\.(JPG|jpg|PNG|png|JPEG|JPEG|epub|EPUB)$/)) {
        req.fileValidationError = {
            message: "Only image file are allowed!"
        }
        return cb(new Error("Only image & EPUB file are allowed!"), false)
    }
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter})

const uploadFields = () => {
    return upload.fields([{
        name: 'bookFile',
        maxCount: 1
    }, {
        name: 'bookCover',
        maxCount: 1
    }])
}

module.exports = { uploadFields }