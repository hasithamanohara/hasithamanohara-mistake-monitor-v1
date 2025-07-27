const User = require('../models/User');

exports.createUser = async (data) => {
  return User.create(data);
};

exports.getUsers = async () => {
  return User.find({ role: 'supervisor' });
};

exports.updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

exports.findUserByUsername = async (username) => {
  return User.findOne({ username });
};