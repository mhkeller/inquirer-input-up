/**
 * `input` type prompt
 */

var util = require('util');
var chalk = require('chalk');
var Base = require('inquirer/lib/prompts/base');
var observe = require('inquirer/lib/utils/events');
var utils = require('inquirer/lib/utils/readline');

/**
 * Module exports
 */

module.exports = Prompt;

/**
 * Constructor
 */

function Prompt() {
  return Base.apply(this, arguments);
}
util.inherits(Prompt, Base);

/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function (cb) {
  this.done = cb;

  // Once user confirm (enter key)
  var events = observe(this.rl);
  var submit = events.line.map(this.filterInput.bind(this));

  var validation = this.handleSubmitEvents(submit);
  validation.success.forEach(this.onEnd.bind(this));
  validation.error.forEach(this.onError.bind(this));

  events.keypress.takeUntil(validation.success).forEach(this.onKeypress.bind(this));

  // Init
  this.render();

  return this;
};

/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function (error, answer) {
  var bottomContent = '';
  var message = this.getQuestion();

  if (this.status === 'answered') {
    message += chalk.cyan(this.answer);
  } else {
    message += this.rl.line;
  }

  if (error) {
    bottomContent = chalk.red('>> ') + error;
  }

  this.screen.render(message, bottomContent);
};

/**
 * When user press `enter` key
 */

Prompt.prototype.filterInput = function (input) {
  if (!input) {
    return this.opt.default == null ? '' : this.opt.default;
  }
  return input;
};

Prompt.prototype.onEnd = function (state) {
  this.answer = state.value;
  this.status = 'answered';

  // Re-render prompt
  this.render();

  this.screen.done();
  this.done(state.value);
};

Prompt.prototype.onError = function (state) {
  this.render(state.isValid);
};

/**
 * When user press a key
 */
Prompt.prototype.onKeypress = function (e) {
  if (e.key.name == 'up') {
    var dflt
    var keyName
    var cursorPos
    var fullWidth

    if (this.opt.default) {
      dflt = (typeof this.opt.default === 'function') ? this.opt.default() : this.opt.default;
    }
    this.rl.line = dflt;
    this.rl.write(null, {ctrl: true, name: 'e'});
  }
  this.render();
};
