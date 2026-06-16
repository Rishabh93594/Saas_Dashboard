const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new match
router.post('/', async (req, res) => {
  const match = new Match({
    matchId: req.body.matchId,
    teams: req.body.teams,
    avatar: req.body.avatar,
    status: req.body.status,
    date: req.body.date,
    score: req.body.score
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a match
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    
    await match.deleteOne();
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a match status or details
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    
    if (req.body.status) match.status = req.body.status;
    if (req.body.score) match.score = req.body.score;
    if (req.body.teams) match.teams = req.body.teams;
    
    const updatedMatch = await match.save();
    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
