const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffname: {
    type: String,
    required: [true, "username cannot be empty :("],
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: [true, "email cannot be empty!"],
  //   unique: true,
  // },
  password: {
    type: String,
    required: [true, "password cannot be empty!"],
  },
  position: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});
// mongoose.model(<mongodb collection name>, our schema)
const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
