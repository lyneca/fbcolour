var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var login = require('facebook-chat-api')

const hostname = 'localhost';
const port = 80;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  email = req.body.email
  password = req.body.password
  color = req.body.color
  thread = req.body.thread
  login({email: email, password: password}, function callback(err, api) {
    api.changeThreadColor(color, thread, function callback(err) {
      if (err) return console.error(err);
      api.logout()
      res.sendFile("public/index.html", {__dirname});
    })
  })
});

app.listen(80, function() {
  console.log('listening on port 80')
})
