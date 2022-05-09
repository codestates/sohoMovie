/* eslint-disable */
const ParentEnvironment = require('jest-environment-node');

class JestEnvironmentFailFast extends ParentEnvironment {
  failedTest = false;

  async handleTestEvent(event, state) {
    if (event.name === 'hook_failure' || event.name === 'test_fn_failure') {
      this.failedTest = true;
    } else if (this.failedTest && event.name === 'run_describe_start') {
      if (event.describeBlock.name === 'Advanced Challenge - Server') {
        event.describeBlock.mode = 'skip';
        event.describeBlock.children.forEach(el => el.mode = 'skip');
      }
    }
    if (super.handleTestEvent) {
      await super.handleTestEvent(event, state);
    }
  }
}

module.exports = JestEnvironmentFailFast;
