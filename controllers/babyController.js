const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate");
const { BabyModel } = require("../models");

/*+++++++++++++++++++++++++++++++++++++++++++
CREATE DAY ENTRY
+++++++++++++++++++++++++++++++++++++++++++*/
router.post("/create", validateJWT, async (req, res) => {
  const {
    day,
    feedingTime1,
    feedingTime2,
    feedingTime3,
    feedingTime4,
    feedingTime5,
    feedingTime6,
    feedingTime7,
    feedingTime8,
    wetDiaper1,
    wetDiaper2,
    wetDiaper3,
    soilDiaper1,
    soilDiaper2,
    soilDiaper3,
  } = req.body;
  const { id } = req.user;
  const babyEntry = {
    day,
    feedingTime1,
    feedingTime2,
    feedingTime3,
    feedingTime4,
    feedingTime5,
    feedingTime6,
    feedingTime7,
    feedingTime8,
    wetDiaper1,
    wetDiaper2,
    wetDiaper3,
    soilDiaper1,
    soilDiaper2,
    soilDiaper3,
    owner: id,
  };
  try {
    const newBaby = await BabyModel.create(babyEntry);
    res.status(200).json(newBaby);
  } catch {
    res.status(500).json({ error: err });
  }
  //   BabyModel.create(babyEntry);
});
/*+++++++++++++++++++++++++++++++++++++++++++
GET ALL ENTRIES
+++++++++++++++++++++++++++++++++++++++++++*/

router.get("/all", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const userJournals = await BabyModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userJournals);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*+++++++++++++++++++++++++++++++++++++++++++
UPDATE AN ENTRY
+++++++++++++++++++++++++++++++++++++++++++*/
router.put("/:entryId", validateJWT, async (req, res) => {
  const { day, feedingTime1 } = req.body;
  const babyId = req.params.entryId;
  const userId = req.user.id;
  const query = {
      where: {
        id: babyId,
        owner: userId,
      },
    },
    updatedMother = {
      day,
      feedingTime1,
    };
  try {
    const update = await BabyModel.update(updatedMother, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*+++++++++++++++++++++++++++++++++++++++++++
DELETE ENTRY
+++++++++++++++++++++++++++++++++++++++++++*/
router.delete("/:deleteId", validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const babyId = req.params.deleteId;
  try {
    const query = {
      where: {
        id: babyId,
        owner: ownerId,
      },
    };
    await BabyModel.destroy(query);
    res.status(200).json({
      message: `The medication was deleted`,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
