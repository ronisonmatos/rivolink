"use strict";
const db = require("../../db/db");
const USER_COLUMM = "user";

const getAllUser = async () => {
  try {
    const users = await db.select("*").from(USER_COLUMM);
    return users;
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
    await db(USER_COLUMM).insert({
      first_name,
      last_name,
      phone_number,
      email,
      password,
      date_of_birth,
      role_type,
      is_enabled,
    });
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await db(USER_COLUMM).where({ id }).first();
    return userById;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (user) => {
  const { id } = user;

  try {
    const updateUser = await db(USER_COLUMM)
      .where({ id })
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

    return updateUser;
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
