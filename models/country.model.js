const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
    {
        iso_code: {
            type: String,
            required: [true, "A ISO Code is required!"],
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, "A Country name is required!"],
            unique: true,
            trim: true
        },
        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Country = model("Country", countrySchema)

module.exports = Country