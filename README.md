Inquirer input-up
=================

> The inquirer input prompt plus up-arrow fills in default value.

## Installation

```
npm install --save inquirer-input-up
```

This prompt style has the normal `input` behavior plus the ability that when you use up arrow, it fills in what you've set as the `default` value. This is useful when the default is *nearly* what you want but not quite.

## Usage

You can register this prompt with a name of your choosing. Here is how you would register it as `'input-up'`:

```js
inquirer.registerPrompt('input-up', require('inquirer-input-up'));
inquirer.prompt({
  type: 'input-up',
  // ...
})
```

### Parameters

*Note: These are exactly the same as the inquirer `input` type. Optional values are written within `[]`*

Take `type`, `name`, `message`[, `default`, `filter`, `validate`] properties.

See [inquirer](https://github.com/SBoudrias/Inquirer.js) readme for more info.

## Example

See [example.js](example.js) for a working example.

```js
var inquirer = require('inquirer');

inquirer.registerPrompt('input-up', require('./index'));
inquirer.prompt([{
  type: 'input-up',
  name: 'pubDate',
  message: 'What is the publish date?',
  default: '2016-01-01'
}]).then(function(answers) {
  console.log(JSON.stringify(answers, null, 2));
});
```
