"use strict";
const userModel = require("../models/userModel");

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.getAllUser();
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userModel.createUser(req);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    phone_number,
    email,
    password,
    date_of_birth,
    role_type,
    is_enabled,
  } = req.body;

  try {
    const user = {
      id,
      first_name,
      last_name,
      phone_number,
      email,
      password,
      date_of_birth,
      role_type,
      is_enabled,
    };
    const updateUser = await userModel.updateUser(user);
    if (updateUser.length !== 0) {
      res.status(201).send(updateUser);
    } else {
      res.status(404).json({ error: "User not found." });
    }
    return updateUser;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.deleteUser(id);
    if (deleteUser) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ erro: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
