import passport from 'passport';

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import {
	FACEBOOk_CLIENT_ID,
	FACEBOOk_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from './default.js';

passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOk_CLIENT_ID,
			clientSecret: FACEBOOk_CLIENT_SECRET,
			callbackURL: '/auth/facebook/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

//Github
passport.use(
	new GithubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: '/auth/github/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

//Google
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default passport;
