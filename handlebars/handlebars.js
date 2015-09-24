var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
var User = require(__dirname + '/../models/user');

// Register helpers
handlebars.registerHelper(layouts(handlebars));

// Register partials
handlebars.registerPartial('layout', fsReadFileSync('dashboard.hbs', 'utf-8'));

// Compile template
var template = handlebars.compile(fsReadFileSync('dashboard.html', 'utf-8'));

// Render template
var output = template({
  title: User.fullName + ' Dashboard',
  items:[
      User.email,
      User.phone,
      User.location,
      User.timezone,
      User.ambition,
      User.dueDate,
      User.relType,
      User.conFreq
  ]
});

console.log(output);
