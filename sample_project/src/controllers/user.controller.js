const userService = require("../services/user.service");

async function createUser(req, res) {
  const { username, password, role, name, email, phone, address } = req.body;

  if (!(username && password && role && name && email && phone && address)) {
    res
      .status(400)
      .json({
        status: false,
        msg: "All fields are mandatory",
        data: { username, password, role, name, email, phone, address },
      });
  }
  try {
    const existingUser = await userService.checkUser(username, email, phone);
    if (existingUser.length) {
      res.json({
        status: false,
        msg: "User already exist",
        data: existingUser,
      });
    } else {
      const response = await userService.createUser(
        username,
        password,
        role,
        name,
        email,
        phone,
        address
      );
      console.log(response);
      res.json({
        status: true,
        msg: "User added successfully",
        data: response,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function authenticateUser(req, res) {
  const { username, password } = req.body;

  try {
    const result = await userService.authUser(username, password);
    if (result.length) {
      res.json({ status: true, msg: "login successfully", data: result });
    } else {
      res.status(401).json({ status: false, msg: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.getUser(userId);
    if (result.length) {
      res
        .status(200)
        .json({ status: true, msg: "user fetch successfully", data: result });
    } else {
      res.status(404).json({ status: false, msg: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.deleteuser(userId);
    console.log(result);
    if (result.totalAffRows > 1) {
      res
        .status(200)
        .json({ status: true, msg: "user deleted successfully", data: result });
    } else {
      res.status(404).json({ status: false, msg: "deletion failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function updateUser(req, res) {
  const {
    username,
    old_username,
    password,
    role,
    name,
    email,
    old_email,
    phone,
    old_phone,
    address,
    user_id,
  } = req.body;
  const isEmailChange = old_email != email;
  const isPhoneChange = old_phone != phone;
  const isUsernameChange = old_username != username;
  if (isEmailChange) {
    const existingEmail = await userService.checkEmail(email);
    if (existingEmail.length) {
      res.status(400).json({ status: false, msg: "Email already in use" });
      return;
    }
  }
  if (isPhoneChange) {
    const existingPhone = await userService.checkPhone(phone);
    if (existingPhone.length) {
      res.status(400).json({ status: false, msg: "Phone already in use" });
      return;
    }
  }
  if (isUsernameChange) {
    const existingUsername = await userService.checkUsername(username);
    if (existingUsername.length) {
      res.status(400).json({ status: false, msg: "username already in use" });
      return;
    }
  }
  if (
    !(
      username &&
      password &&
      role &&
      name &&
      email &&
      phone &&
      address &&
      user_id
    )
  ) {
    res.status(400).json({
      status: false,
      msg: "All fields are mandatory",
      data: {
        username: username ?? "",
        password: password ?? "",
        role: role ?? "",
        name: name ?? "",
        email: email ?? "",
        phone: phone ?? "",
        address: address ?? "",
        user_id: user_id ?? "",
      },
    });
  }
  try {
    const response = await userService.updateUser(
      username,
      password,
      role,
      name,
      email,
      phone,
      address,
      user_id
    );
    console.log(response);
    res.json({
      status: true,
      msg: "User updated successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createUser,
  authenticateUser,
  getUser,
  deleteUser,
  updateUser,
};
