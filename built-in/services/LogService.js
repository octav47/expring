function init(expring) {
	function formatDate(date) {
		let day = date.getDate();
		if (day < 10) {
			day = '0' + day;
		}

		let month = date.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}

		let year = date.getFullYear();

		return date.toTimeString().split(' ')[0] + ' ' + day + '-' + month + '-' + year;
	}

	function getTimestamp() {
		return formatDate(new Date());
	}

	class LogService extends expring.Service {
		constructor() {
			super('LogService');
		}
	}

	let ls = new LogService();
	ls.addMethods([{
		name: 'debug',
		fn: function (data) {
			console.log(getTimestamp() + ' ' + data);
		}
	}, {
		name: 'dStart',
		fn: function (data) {
			console.log(getTimestamp() + ', S->, ' + ' ' + data);
		}
	}, {
		name: 'dEnd',
		fn: function (data) {
			console.log(getTimestamp() + ', ->E, ' + ' ' + data);
		}
	}]);

	return ls;
}

module.exports = init;