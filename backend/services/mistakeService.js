const Mistake = require('../models/Mistake');

exports.createMistake = async (data) => {
  return Mistake.create(data);
};

exports.getMistakes = async (sort, filter) => {
  let query = {};
  if (filter) {
    const [key, value] = filter.split(':');
    query[key] = value;
  }
  return await Mistake.find(query)
    .populate('employeeId', 'name')
    .sort(sort || 'date');
};

exports.updateMistake = async (id, data) => {
  return Mistake.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMistake = async (id) => {
  return Mistake.findByIdAndDelete(id);
};

exports.markSolved = async (id, solved) => {
  return Mistake.findByIdAndUpdate(id, { solved }, { new: true });
};