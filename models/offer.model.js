const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
    {
        //pais, imagen, descripcion, precio, fechaInicial, fechaFinal, condiciones
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country', 
            required: [true, "A Country name is required"]
        },
        image: {
            type: String,
            default: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/12/23/61c456cc62a0b.r_d.2520-1680-0.jpeg'
        },
        description: {
            type: String,
            required: [true, "Specify a description for the offer"],
            trim: true
        },
        price: { 
            type: Number,
            required: [true, "Specify a price for this offer"],
        },
        date_start: {
            type: Date,
            required: true,            
        },
        date_end: {
            type: Date,
            required: true,            
        },
        conditions: {
            type: String,            
            trim: true
        },                
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Offer = model("Offer", offerSchema)

module.exports = Offer