
const User = require("../models/User");
const Group = require("../models/Group");
const { validationResult } = require("express-validator");

exports.createGroup = async (req, res) => {

  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraer email y password
  const { name, grade, cicle } = req.body;
  const teacherId = req.user.id;
  try {
    let group = await Group.findOne({ name, grade, cicle });
    if (group) {
      return res.status(400).json({ msg: "El grupo ya existe" });
    }
    group = new Group(req.body);
    group.teacher = teacherId;
    await group.save();

    await User.findByIdAndUpdate(teacherId, { $push: { groups: group._id } });
    return res.status(200).json(group);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Hubo un error");
  }
};

exports.updateGroup = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    //extraer email y password
    const { name, grade, cicle } = req.body;
    const groupId = req.params.id;

    try {
      let group = await Group.findById(groupId);

      if (!group) {
        return res.status(400).json({ msg: "El grupo no existe" });
      }
      if (group.teacher.toString() !== req.user.id) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      group = await Group.findByIdAndUpdate(
        groupId,
        req.body,
        { new: true }
      );

      return res.status(200).json(group);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Hubo un error");
    }
  };
  