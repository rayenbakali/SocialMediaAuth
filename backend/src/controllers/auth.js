import { CLIENT_URL } from '../config/default.js';
import passport from '../config/passport.js';

export function loginSuccess(req, res) {
	if (req.user) {
		return res.status(200).json({
			success: true,
			message: 'successfull',
			user: req.user,
			//   cookies: req.cookies
		});
	}
}

export function loginFailed(req, res) {
	return res.status(401).json({
		success: false,
		message: 'failure',
	});
}

export function logOutUser(req, res) {
	req.logout({ done: true });
	return res.redirect(CLIENT_URL);
}
