const express = require('express')
const bodyparser = require('body-parser')
const mongo = require("./database")
const port = 3001
var cors = require('cors') 

const app = express()

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))

mongo.connect   



let contact = mongo.contactModel;

app.use(express.json())
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/Blog',require('./routes/Blog.js'));

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
  
    let contacts = new contact({
      name: name,
      email: email,
      message: message
    });
  
    contacts.save()
      .then(doc => {
        res.status(201).send({
          status: 'success',
          message: 'Contact saved successfully',
          data: doc
        });
      })
      .catch(error => {
        res.status(500).send({
          status: 'error',
          message: 'Failed to save contact',
          error: error.message
        });
      });
  });
  
app.listen(port, () => {
    console.log(`Server is listening at https://localhost:${port}`)
})



