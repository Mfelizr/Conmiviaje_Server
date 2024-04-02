const router = require("express").Router()
const {
    listAllCountries,
    getOneCountry,    
} = require ("../controllers/country.controller")

router.get("/list", listAllCountries)
router.get("/getOne/:country_id", getOneCountry)

module.exports = router