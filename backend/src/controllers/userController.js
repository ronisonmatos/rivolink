"use strict";
const userModel = require("../models/userModel");
const logger = require("../../config/logger")

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.getAllUser();

    // Criar um objeto 'user' com os campos desejados.
    const user = users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      password: user.password,
      date_of_birth: user.date_of_birth,
      role_type: user.role_type,
      is_enabled: user.is_enabled,
    }));

    // Enviar a resposta com a estrutura JSON desejada.
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userModel.createUser(req);

    // Criar um objeto 'user' com os campos desejados.
    const user = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      phone_number: newUser.phone_number,
      email: newUser.email,
      password: newUser.password,
      date_of_birth: newUser.date_of_birth,
      role_type: newUser.role_type,
      is_enabled: newUser.is_enabled,
    };

    // Enviar a resposta com a estrutura JSON desejada.
    res.status(201).json({ user });
    logger.info("User created successfully")
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error);
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
      logger.info(`User not found: ${user.email}`)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error);
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
      logger.info(`Updated user data: ${user.email}`)
    } else {
      res.status(404).json({ error: "User not found." });
      // Criar regra para atualizar e-mail
      logger.error(`User not found: ${user.email}`)
    }
    return updateUser;
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userModel.deleteUser(id);
    if (deleteUser) {
      res.sendStatus(204);
      logger.info(`User deleted successfully: ID ${id}`)
    } else {
      res.status(404).json({ erro: "User not found." });
      logger.error(`User not found: ID ${id}`)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
