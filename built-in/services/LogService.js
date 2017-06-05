function init(expring) {
	class LogService extends expring.Service {
		constructor() {
			super('LogService');

			const log4js = require('log4js');
			const log = log4js.getLogger();
			// log.level = 'debug';

			this.log = log;
		}
	}

	let ls = new LogService();
	ls.addMethods([{
		name: 'debug',
		fn: function (data) {
			this.log.debug(data);
		}
	}, {
		name: 'dStart',
		fn: function (data) {
			this.log.debug(getTimestamp() + ', S->, ' + ' ' + data);
		}
	}, {
		name: 'dEnd',
		fn: function (data) {
			this.log.debug(getTimestamp() + ', ->E, ' + ' ' + data);
		}
	}]);

	return ls;
}

module.exports = init;