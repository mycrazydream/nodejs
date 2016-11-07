// index.js
const path 		= require('path')  
const express 		= require('express')  
const exphbs 		= require('express-handlebars')
const port		= 5000;
const app 		= express()

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('port', (process.env.PORT || port));
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {  
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {  
  request.chance = Math.random()
  next()
})

app.get('/', (request, response) => {  
  response.render('home', {
    name: 	'John',
	email: 	'johnny.b.good@bttf.com'
  })
})

//time for a test
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
