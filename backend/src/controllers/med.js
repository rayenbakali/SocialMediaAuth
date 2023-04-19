import MedModel from "../models/med.js";
import PharmacyModel from "../models/pharmacy.js";
import { validationResult } from "express-validator";

export async function add(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: JSON.stringify(errors) });
  }

  const created = await MedModel.create(req.body);

  if (!created) return res.status(400).json({ error: "Invalid data!2" });

  const createdId = created._id;

  const update = await PharmacyModel.updateOne(
    { _id: req.query.pharId },
    {
      $push: {
        meds: createdId,
      },
    },
    { upsert: false }
  );

  if (!update.modifiedCount)
    return res.status(400).json({ error: "Invalid input!3" });

  res.send({ message: "Success!", created });
}

export async function getAll(req, res) {
  if (req.query.type)
    return res.send(await MedModel.find({ type: req.query.type }));

  res.send(await MedModel.find({}));
}

export async function getOne(req, res) {
  const found = await MedModel.findOne({ _id: req.params.id });

  if (!found) return res.status(404).json({ error: "Not found !" });

  res.send(found);
}

export async function updateOne(req, res) {
  const updated = await MedModel.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      stock: req.body.stock,
      type: req.body.type,
      price: req.body.price,
    },
    {
      upsert: false,
    }
  );

  if (!updated.modifiedCount)
    return res.status(404).json({ error: "Invalid data!" });

  res.send({
    message: "Success!",
    updated: await MedModel.findOne({ _id: req.params.id }),
  });
}

export async function updateImage(req, res) {
  const updated = await MedModel.updateOne(
    { _id: req.params.id },
    {
      image: `${req.file.filename}`,
    },
    {
      upsert: false,
    }
  );

  if (!updated.modifiedCount)
    return res.status(404).json({ error: "Nothing to update." });

  res.send({ image: `${req.file.filename}` });
}

export async function deleteOne(req, res) {
  const med = await MedModel.findOne({ _id: req.params.id });

  if (!med) return res.status(404).json({ error: "Not found!" });

  const deleted = await MedModel.deleteOne({ _id: med._id });

  if (!deleted.deletedCount)
    return res.status(404).json({ error: "Invalid data!" });

  const updated = await PharmacyModel.updateOne(
    { _id: req.query.pharId },
    {
      $pull: {
        meds: med._id,
      },
    },
    { upsert: false }
  );

  if (!updated.modifiedCount)
    return res.status(400).json({ error: "Invalid data!" });

  res.send({ message: "Deleted successfully!" });
}
