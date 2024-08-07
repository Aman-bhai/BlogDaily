const mongoose = require("mongoose")
require('dotenv').config();


const url = process.env.MONGO




let promise = mongoose.connect(url).then(() => {
    console.log("Server is connected with the Database")
})




const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: { type: String, default: Date }
}, { timestamps: true })

const userModel = mongoose.model("user", userschema)

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,

    date: { type: String, default: Date }
}, { timestamps: true })

const contactModel = mongoose.model("ContactBlog", contactSchema)

let BlogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String
    },
    date: { type: String, default: Date }
}, { timestamps: true })

const Blogmodel = mongoose.model("Blog", BlogSchema)

module.exports = {
    connect: promise,
    BlogSchema: BlogSchema,
    Blogmodel: Blogmodel,
    contactModel: contactModel,
    userModel: userModel

}
