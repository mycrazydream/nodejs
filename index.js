// index.js
var	path 		= require('path');
var	express 	= require('express');
var	exphbs 		= require('express-handlebars');
var 	mongod		= require('mongod');
var	mongoose 	= require('mongoose');
const 	app 		= express();
const 	port		= 5000;
const 	dbname		= 'nettuts';
const 	dbport		= '27017';
const 	dburl		= 'localhost:'+dbport+'/'+dbname;
const 	db 		= mongoose.connect('mongodb://'+dburl);

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

app.get('/dbget', function(request, response) {
    db.collection('nettuts').find({nationality: 'american'});
});

app.get('/dbsave', function (request, response) {
    /**
    * Lets define our Model for User entity. This model represents a collection in the database.
    * We define the possible schema of User document and data types of each field.
    **/
    var User = mongoose.model('User', {
	first:	    String, 
	last:	    String, 
	dob:	    Date, 
	gender:	    String,
	hair_colour:String, 
	occupation: String, 
	nationality:String
    });

    /**
    * Lets Use our Models
    **/

    //Lets create a new user
    var user1 = new User({
	first:	'Robert',
	last:	'Redford',
	dob:	'1936/18/08',
	gender: 'm',
	hair_colour: 'Brown',
	occupation: 'actor',
	nationality: 'american'
    });

    //Some modifications in user object
    user1.name = user1.first.toUpperCase();

    //Lets try to print and see it. You will see _id is assigned.
    console.log(user1);

    //Lets save it
    user1.save(function (err, userObj) {
  	if (err) {
    	    console.log(err);
  	} else {
    	    console.log('saved successfully:', userObj);
  	}
    });	 
});

//time for a test
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
