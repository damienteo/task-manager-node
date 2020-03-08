const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });

    const { completed, limit, skip, sortBy } = req.query;

    const match = {};
    if (req.query.completed) {
      match.completed = completed === "true";
    }

    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    const options = {
      limit: parseInt(limit),
      skip: parseInt(skip),
      sort
    };

    await req.user
      .populate({
        path: "tasks",
        match,
        options
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const { params, body, user } = req;

  const updates = Object.keys(body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) res.status(400).send("Invalid Updates!");

  try {
    const task = await Task.findOne({ _id: params.id, owner: user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = body[update]));
    task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const { params, user } = req;

  try {
    const task = await Task.findOneAndDelete({
      _id: params.id,
      owner: user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
