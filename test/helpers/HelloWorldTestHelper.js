
const Application = require('spectron').Application;
const electron = require('electron');

/**
 * The HelloWorldTestHelper contains common stuff for tests.
 */
module.exports = function() {

	const self = this;

	/**
	 * Makes the HelloWorld Application available.
	 *
	 * @type {Application}
	 */
	self.app = null;

	/**
	 * Starts HelloWorld from '/electron/main.js/'.
	 */
	beforeEach(function() {
		self.app = new Application({
			path: electron,
			args: [__dirname + '/../../electron/main.js']
		});
		return self.app.start();
	});

	/**
	 * Stops HelloWorld.
	 */
	afterEach(function() {
		if (self.app && self.app.isRunning()) {
			return self.app.stop()
		}
	});
};
