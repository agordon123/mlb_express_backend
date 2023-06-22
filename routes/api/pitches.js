var router = require("express").Router();
var Pitch = require("../../models/Pitch");

router.get("/", async function (req, res) {
  var pitches = await Pitch.find({});
  if (pitches) res.json({ pitches: pitches, error: false });
  else res.json({ error: true });
});

router.post("/", function (req, res) {
  var pitch = new Pitch();
  pitch.name = req.body.name;
  pitch.speed = req.body.speed;
  pitch.control = req.body.control;
  pitch.movement = req.body.movement;

  pitch
    .save()
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

module.exports = router;
