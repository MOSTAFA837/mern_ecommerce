const Banner = require("../models/banner");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    res.json(await new Banner(req.body).save());
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

exports.listAll = async (req, res) => {
  const banners = await Banner.find({}).populate("category").exec();

  res.json(banners);
};

exports.read = async (req, res) => {
  const banner = await Banner.findOne({ _id: req.params._id }).exec();

  res.json(banner);
};

exports.update = async (req, res) => {
  try {
    const updated = await Banner.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Banner.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    res.json(deleted);
  } catch (err) {
    return res.status(400).send("product delete failed");
  }
};
