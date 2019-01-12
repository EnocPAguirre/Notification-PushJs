const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set static path

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BCZ6CwkyUtFgiEVS8K0kRteWz46HTRJ5paq_F7w8iZBXtYnbB68DfRe9768IzPoiMz1jRw74U7xcYRRAYcH88oo';
const privateVapidKey = 'H4FndSyKGM8vGOJyqXCJl61SSFISRZFGoNVeIe-uuDg';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Suscribe Route
app.post('/suscribe', (req, res) => {
  const subscription = req.body;

  //Enviar un status
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({
    title: 'Push Test'
  });
  //Pasar el objeto denbtro de una notificacion
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
