import { Router } from 'express';
import { body } from 'express-validator';

import {
	add,
	deleteOne,
	getAll,
	getOne,
	updateOne,
	updateImage,
} from '../controllers/med.js';

import multer from '../middlewares/multer.js';

const router = Router();

router
	.route('/')
	.get(getAll)
	.post(
		body('name').notEmpty().isLength({ min: 5 }),
		body('stock').notEmpty().isNumeric(),
		body('price').notEmpty().isNumeric(),
		body('type').notEmpty().isLength({ min: 4 }),
		add
	);

router
	.route('/:id')
	.get(getOne)
	.put(updateOne)
	.delete(deleteOne)
	.post(multer(), updateImage);

export default router;
