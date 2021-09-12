require('global-agent/bootstrap');

exports.config = {
  user: process.env.BS_USER || 'BS_USER',
  key: process.env.BS_KEY || 'BS_KEY',

  updateJob: false,
  specs: [
    'tests/specs/single_test.js'
  ],
  exclude: [],

  capabilities: [
    // {
    //   browserName: 'Chrome',
    //   "os" : "Windows",
    //   "os_version" : "10",
    //   "browser_version" : "latest",
    //   'browserstack.use_w3c' : true,
    //   'browserstack.selenium_version': '3.141.59',
    //   "browserstack.debug" : "true",
    //   "browserstack.networkLogs" : "true",
    //   name: 'single_test',
    //   build: 'webdriverIO-browserstack'
    // },
    {
      "device": "iPhone 12",
      "os_version": "14",
      "browserName": "ios",
      "realMobile": "true",
      "browserstack.appium_version" : "1.18.0",
      "safariAllowPopups": "true",
      "autoAcceptAlerts": "true",
      "browserstack.debug" : "true",
      "build": "webdriverIO-browserstack"
    },
],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub-cloud.browserstack.com',

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}', []);
    } else {
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}', []);
    }
  }
}
