const express = require('express');

express.Controllers = {};

class Controller {
	constructor(name) {
		this.name = name;
		this.requests = [];

		if (express.Controllers[name]) {
			throw `${name} is already exists!`;
		} else {
			express.Controllers[name] = this;
		}
	}

	addRequest(request) {
		this.requests.push(request);
	}

	setRequests(requests) {
		this.requests = requests;
	}

	init(app) {
		this.app = app;

		if (!this.app._controllers) {
			this.app._controllers = {};
		}
		this.app._controllers[this.name] = [];

		for (let request of this.requests) {
			if (!request.type) {
				request.type = 'get';
			}
			request.type = request.type.toLowerCase();
			if (!request.params) {
				request.params = [];
			}
			request.deprecated = !!request.deprecated;

			this.app._controllers[this.name].push({
				deprecated: request.deprecated,
				url: request.url,
				type: request.type,
				params: request.params
			});

			request.fn = request.fn.bind(this);
			this.app[request.type](request.url, request.fn);
		}
	}
}

express.Services = {};

class Service {
	constructor(name) {
		this.name = name;
		this.methods = [];

		if (express.Services[name]) {
			throw `${name} is already exists!`;
		} else {
			express.Services[name] = this;
		}
	}

	addMethod(method) {
		this.methods.push(method);

		this[method.name] = method.fn;
	}

	addMethods(methods) {
		for (let method of methods) {
			this.addMethod(method);
		}
	}
}

express.Controller = Controller;
express.Service = Service;

// ===== import built-in Services
let LogService = require('./built-in/services/LogService.js')(express);

express.Services.LogService = LogService;
// =====

module.exports = express;