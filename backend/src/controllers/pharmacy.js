import PharmacyModel from '../models/pharmacy.js';
import { validationResult } from 'express-validator';

export async function add(req, res) {
	if (!validationResult(req).isEmpty()) {
		return res.status(400).json({ error: 'Invalid data!' });
	}

	const created = await PharmacyModel.create(req.body);

	if (!created) return res.status(400).json({ error: 'Invalid data!' });

	res.send({ message: 'Pharmacy added successfully!', created });
}

export async function getAll(req, res) {
	res.send(await PharmacyModel.find({}, { meds: 0 }));
}

export async function getOne(req, res) {
	const found = await PharmacyModel.findOne({ _id: req.params.id }).populate(
		'meds'
	);

	if (!found) return res.status(404).json({ error: 'Not found !' });

	res.send(found);
}

export async function updateOne(req, res) {
	const updateRes = await PharmacyModel.updateOne(
		{ _id: req.params.id },
		{
			name: req.body.name,
			phone: req.body.phone,
			address: req.body.address,
		},
		{
			upsert: false,
		}
	);

	if (!updateRes.modifiedCount)
		return res.status(404).json({ error: 'Invalid data!' });

	const updated = await PharmacyModel.findOne({ _id: req.params.id });

	res.send({ message: 'Success!', updated });
}

export async function disable(req, res) {
	const updated = await PharmacyModel.updateOne(
		{ _id: req.params.id },
		{
			status: 0,
		},
		{
			upsert: false,
		}
	);

	if (!updated.modifiedCount)
		return res.status(404).json({ error: 'Invalid data!' });

	res.send({ message: 'Success!' });
}

export async function updateLogo(req, res) {
	const updated = await PharmacyModel.updateOne(
		{ _id: req.params.id },
		{
			logo: `${req.file.filename}`,
		},
		{
			upsert: false,
		}
	);

	if (!updated.modifiedCount)
		return res.status(404).json({ error: 'Nothing to update.' });

	res.send({ image: `${req.file.filename}` });
}
