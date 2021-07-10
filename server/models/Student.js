
const { Schema, model } = require('mongoose');

const studentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fatherLastname: {
      type: String,
      required: true,
      trim: true,
    },
    motherLastname: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Student', studentSchema);