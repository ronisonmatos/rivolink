"use strict";
const db = require("../../db/db");
const USER_COLUMM = "user";
const bcrypt = require("bcryptjs");
const saltRounds = 10; // You can adjust the number of salt rounds as needed.
const dateUtils = require("../utils/dateUtils");

const getAllUser = async () => {
  try {
    return await db.select("*").from(USER_COLUMM);
  } catch (error) {
    throw error;
  }
};

const createUser = async (req) => {
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
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db(USER_COLUMM).insert({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashedPassword,
      date_of_birth: dateUtils.formatStringInDate(date_of_birth),
      role_type,
      is_enabled,
    });

    // Recupere os dados do usuário recém-inserido no banco de dados.
    return {
      first_name,
      last_name,
      phone_number,
      email,
      password, // Lembre-se de que o password deve ser retornado com hash.
      date_of_birth,
      role_type,
      is_enabled,
    };

  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await db(USER_COLUMM).where({id}).first();
  } catch (error) {
    throw error;
  }
};

const updateUser = async (user) => {
  const { id } = user;
  try {
    return await db(USER_COLUMM)
        .where({id})
        .update(user, [
          "id",
          "first_name",
          "last_name",
          "phone_number",
          "email",
          "date_of_birth",
          "role_type",
          "is_enabled"
        ]);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await db(USER_COLUMM).where({id}).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
