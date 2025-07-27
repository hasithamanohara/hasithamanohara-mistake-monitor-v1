const mistakeService = require('../services/mistakeService');

exports.createMistake = async (req, res) => {
  try {
    const mistake = await mistakeService.createMistake(req.body);
    res.status(201).json(mistake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMistakes = async (req, res) => {
  try {
    const { sort, filter } = req.query;
    const mistakes = await mistakeService.getMistakes(sort, filter);
    res.json(mistakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMistake = async (req, res) => {
  try {
    const mistake = await mistakeService.updateMistake(req.params.id, req.body);
    res.json(mistake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMistake = async (req, res) => {
  try {
    await mistakeService.deleteMistake(req.params.id);
    res.json({ message: 'Mistake deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markSolved = async (req, res) => {
  try {
    const mistake = await mistakeService.markSolved(req.params.id, req.body.solved);
    res.json(mistake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};