const ROLES_FILE = __dirname + '/roles.txt';
const fs = require('fs');


module.exports = (scope) => (req, res, next) => {
	const authorizationHeader = req.headers['x-role'];
	if (authorizationHeader) {
		if (authorizationHeader === "INVALID_ROLE") {
			res.status(403).json({ message: "Unauthorized! Your current role is invalid." });
		} else if (scope === '') {
			res.status(200).json({ message: "This route is non-protected." });
		} else {
			let rawdata = fs.readFileSync('roles.txt').toString().trim();
			let roles = JSON.parse(rawdata);
			let currentrole = roles.filter(item => item.role === authorizationHeader);
			let tasks = currentrole[0].scopes['tasks'];
			let scopetask = scope.split('.')[1];
			if (tasks.includes(scopetask)) {
				res.status(201).json({ message: "Authorized! Your current role is valid." });
				next();
			} else {
				res.status(403).json({ message: "Unauthorized! You have no permissions." });
			}
		}
	}
	else {
		res.status(403).json({ message: "Unauthorized! You must be logged in to use this service." });
	}
};
