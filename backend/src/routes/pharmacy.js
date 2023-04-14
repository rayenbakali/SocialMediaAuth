import { Router } from 'express';
import { body } from 'express-validator';

import {
	add,
	disable,
	getAll,
	getOne,
	updateOne,
	updateLogo,
} from '../controllers/pharmacy.js';

import multer from '../middlewares/multer.js';

const router = Router();

router
	.route('/')
	.get(getAll)
	.post(
		body('name').notEmpty().isLength({ min: 5 }),
		body('phone').notEmpty().isLength({ min: 8, max: 8 }),
		body('address').notEmpty().isLength({ min: 4 }),
		add
	);

router
	.route('/:id')
	.get(getOne)
	.put(updateOne)
	.patch(disable)
	.post(multer(), updateLogo);

export default router;
