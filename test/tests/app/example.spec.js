/**
 * This is an example test.
 */

const chai = require('chai');
const expect = chai.expect;
const HelloWorldTestHelper = require('../../helpers/HelloWorldTestHelper');

describe('HelloWorld window', function() {

	/**
	 * The HelloWorld test helper does common stuff.
	 *
	 * @type {module.exports}
	 */
	const HelloWorldTestHelper = new HelloWorldTestHelper();

	it('should have "HelloWorld" in the title', function () {
		return HelloWorldTestHelper.app.client.browserWindow.getTitle().then(function(title) {
			expect(title).to.contain('HelloWorld');
			return Promise.resolve();
		});
	})
});
