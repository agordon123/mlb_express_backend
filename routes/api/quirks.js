var router = require("express").Router();
var Quirk = require("../../models/Quirk");

router.get("/", async function (req, res) {
  var quirks = await Quirk.find({});
  if (quirks) res.json({ quirks: quirks, success: true });
  else res.json({ error: false });
});

router.post("/", function (req, res) {
  var quirk = new Quirk();
  quirk.name = req.body.name;
  quirk.description = req.body.description;
  quirk.img = req.body.img;
  quirk
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .error((err) => {
      res.json({ success: false });
    });
});

module.exports = router;
