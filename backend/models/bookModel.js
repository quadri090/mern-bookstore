import mongoose from 'mongoose' //npm i mongoose


const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true//mongoose will automatically include created and updated timestamps in each object in our model
    }
    )

export const Book = mongoose.model('cat', bookSchema);