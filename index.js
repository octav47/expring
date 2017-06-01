const express = require('express');

class Controller {
	constructor(name) {
		this.name = name;
		this.requests = [];
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

class Service {
	constructor(name) {
		this.name = name;
		this.methods = [];
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

module.exports = express;