const { Schema, model } = require("mongoose");
//pais_origen, pais_destino, tipo de viaje, [{requisitos, documentacion[], visados, queHacer, alojamientos, informacionPais}]

const travelInformationSchema = new Schema(
    {
        origin_country: {
            type: Schema.Types.ObjectId,
            ref: 'country', 
            required: [true, "A Country is required"]
        },
        destination_country: {
            type: Schema.Types.ObjectId,
            ref: 'country', 
            required: [true, "A Country is required"]
        },
        trip_type: {
            type: String,
            required: [true, "A type of trip is required"],            
            trim: true
        },                
        image: {
            type: String,
            default: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/12/23/61c456cc62a0b.r_d.2520-1680-0.jpeg'
        },                
        requirements: [],
        visa_information: {
            type: String,
            trim: true
        },  
        what_to_do: {
            type: String,
            trim: true
        },                
        accommodation: {
            type: String,
            trim: true
        },                
        country_information: {
            type: String,
            trim: true
        },                        
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const TravelInformation = model("TravelInformation", travelInformationSchema)

module.exports = TravelInformation