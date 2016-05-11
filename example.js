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