var router = require("express").Router();
var Item = require("../../models/Item");
var Pitch = require("../../models/Pitch");
var Quirk = require("../../models/Quirk");

router.get("/:page", async function (req, res) {
  var items = await Item.find({}).populate("pitches").populate("quirks");
  const first_index = (req.params.page - 1) * 25;
  const last_index = req.params.page * 25;
  var result = items.filter(
    (index, item) => index >= first_index && index < last_index
  );
  if (result) res.json({ items: result, error: false });
  else res.json({ error: true });
});

router.post("/", async function (req, res) {
  var item = new Item();
  item.type = req.body.type;
  item.img = req.body.img;
  item.baked_img = req.body.baked_img;
  item.sc_baked_img = req.body.sc_baked_img;
  item.name = req.body.name;
  item.rarity = req.body.rarity;
  item.team = req.body.team;
  item.team_short_name = req.body.team_short_name;
  item.ovr = req.body.ovr;
  item.series = req.body.series;
  item.series_texture_name = req.body.series_texture_name;
  item.series_year = req.body.series_year;
  item.display_position = req.body.display_position;
  item.display_secondary_positions = req.body.display_secondary_positions;
  item.jersey_number = req.body.jersey_number;
  item.age = req.body.age;
  item.bat_hand = req.body.bat_hand;
  item.throw_hand = req.body.throw_hand;
  item.weight = req.body.weight;
  item.height = req.body.height;
  item.born = req.body.born;
  item.is_hitter = req.body.is_hitter;
  item.stamina = req.body.stamina;
  item.pitching_clutch = req.body.pitching_clutch;
  item.hits_per_bf = req.body.hits_per_bf;
  item.k_per_bf = req.body.k_per_bf;
  item.bb_per_bf = req.body.bb_per_bf;
  item.hr_per_bf = req.body.hr_per_bf;
  item.pitch_velocity = req.body.pitch_velocity;
  item.pitch_control = req.body.pitch_control;
  item.pitch_movement = req.body.pitch_movement;
  item.contact_left = req.body.contact_left;
  item.contact_right = req.body.contact_right;
  item.power_left = req.body.power_left;
  item.power_right = req.body.power_right;
  item.plate_vision = req.body.plate_vision;
  item.plate_discipline = req.body.plate_discipline;
  item.batting_clutch = req.body.batting_clutch;
  item.bunting_ability = req.body.bunting_ability;
  item.drag_bunting_ability = req.body.drag_bunting_ability;
  item.hitting_durability = req.body.hitting_durability;
  item.fielding_durability = req.body.fielding_durability;
  item.fielding_ability = req.body.fielding_ability;
  item.arm_strength = req.body.arm_strength;
  item.arm_accuracy = req.body.arm_accuracy;
  item.reaction_time = req.body.reaction_time;
  item.blocking = req.body.blocking;
  item.speed = req.body.speed;
  item.baserunning_ability = req.body.baserunning_ability;
  item.baserunning_aggression = req.body.baserunning_aggression;
  item.hit_rank_image = req.body.hit_rank_image;
  item.fielding_rank_image = req.body.fielding_rank_image;
  item.power_left = req.body.power_left;

  const myPitches = JSON.parse(req.body.pitches);
  await Promise.all(
    myPitches.map(async (pit) => {
      var pitch = await Pitch.findOne({
        name: pit.name,
        speed: pit.speed,
        control: pit.control,
        movement: pit.movement,
      });

      if (pitch) {
        item.pitches.push(pitch._id);
      } else {
        pitch = new Pitch({
          name: pit.name,
          speed: pit.speed,
          control: pit.control,
          movement: pit.movement,
        });

        await pitch.save();
        item.pitches.push(pitch._id);
      }
    })
  );

  const myQuirks = JSON.parse(req.body.quirks);
  await Promise.all(
    myQuirks.map(async (qur) => {
      var quirk = await Quirk.findOne({
        name: qur.name,
        description: qur.description,
        img: qur.img,
      });
      if (quirk) {
        item.quirks.push(quirk._id);
      } else {
        quirk = new Quirk({
          name: qur.name,
          description: qur.description,
          img: qur.img,
        });
        await quirk.save();
        item.quirks.push(quirk._id);
      }
    })
  );
  item.is_sellable = req.body.is_sellable;
  item.has_augment = req.body.has_augment;
  item.augment_text = req.body.augment_text;
  item.augment_end_date = req.body.augment_end_date;
  item.has_matchup = req.body.has_matchup;
  item.stars = req.body.stars;
  item.trend = req.body.trend;
  item.new_rank = req.body.new_rank;
  item.has_rank_change = req.body.has_rank_change;
  item.event = req.body.event;
  item.set_name = req.body.set_name;
  item.is_live_set = req.body.is_live_set;
  item.ui_anim_index = req.body.ui_anim_index;

  console.log(item);
  item
    .save()
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = router;
