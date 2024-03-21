const router = require("express").Router()
const {
    listAllOffers,
    getOneOffer,
    createOneOffer,
    editOneOffer,
    deleteOneOffer,
} = require ("../controllers/offer.controller")

router.get("/list", listAllOffers)
router.get("/getOne/:offer_id", getOneOffer)

router.post("/create", createOneOffer)

router.put("/edit/:offer_id", editOneOffer)

router.delete("/delete/:offer_id", deleteOneOffer)

module.exports = router
