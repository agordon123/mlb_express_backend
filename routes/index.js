var router = require("express").Router();
const fetchAndStoreData = require("./api/mlb23DataFetcher");
router.use("/api", require("./api"));
router.get("/fetch-data", (req, res) => {
    fetchAndStoreData(req.params)
    .then(() => {
      res.send("Data fetched and stored successfully.");
    })
    .catch((error) => {
      res.status(500).send("Error fetching and storing data.");
    });
});
module.exports = router;
