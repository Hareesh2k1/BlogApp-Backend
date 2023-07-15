const mongoose= require('mongoose');
const postScheme = mongoose.Schema({
    userId: String,
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    img_url: String,
        createdAt: {
            type: Date,
            default: new Date(),
        }
})

const postModel = mongoose.model("post", postScheme);
module.exports = postModel;

