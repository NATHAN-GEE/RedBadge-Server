const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate");
const { MotherModel } = require("../models");

router.post("/create", validateJWT, async (req, res) => {
  const { med, amount } = req.body;
  const { id } = req.user;
  const motherEntry = {
    med,
    amount,
    owner: id,
  };
  try {
    const newMother = await MotherModel.create(motherEntry);
    res.status(200).json(newMother);
  } catch {
    res.status(500).json({ error: err });
  }
  // MotherModel.create(motherEntry);
});

router.get("/all", validateJWT, async (req, res) => {
  let { id } = req.user;
  try {
    const userMother = await MotherModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userMother);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:entryId", validateJWT, async (req, res) => {
  const { med, amount } = req.body;
  const motherId = req.params.entryId;
  const userId = req.user.id;
  const query = {
      where: {
        id: motherId,
        owner: userId,
      },
    },
    updatedMother = {
      med,
      amount,
    };
  try {
    const update = await MotherModel.update(updatedMother, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:deleteId", validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const motherId = req.params.deleteId;
  try {
    const query = {
      where: {
        id: motherId,
        owner: ownerId,
      },
    };
    await MotherModel.destroy(query);
    res.status(200).json({
      message: `The medication was deleted`,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
