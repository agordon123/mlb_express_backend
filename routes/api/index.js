var router = require("express").Router();

// router.use("/", require("./users"));
router.use("/items", require("./items"));
router.use("/pitches", require("./pitches"));
router.use("/quirks", require("./quirks"));

module.exports = router;
