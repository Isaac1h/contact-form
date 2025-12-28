// Importation des modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Configuration du serveur
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Chemin du fichier JSON
const messagesFile = path.join(__dirname, 'messages.json');

// Crée le fichier s'il n'existe pas
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
  console.log('✅ Fichier messages.json créé');
}

// Route pour recevoir le formulaire
app.post('/submit-form', (req, res) => {
  console.log('📩 Formulaire reçu !');
  console.log(req.body);

  const formData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    queryType: req.body.queryType,
    message: req.body.message,
    consent: req.body.consent,
    date: new Date().toLocaleString('fr-FR')
  };

  let messages = [];
  try {
    const data = fs.readFileSync(messagesFile, 'utf8');
    messages = JSON.parse(data);
  } catch (error) {
    console.error('❌ Erreur lecture:', error);
  }

  messages.push(formData);

  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    console.log('✅ Message sauvegardé !');
    
    res.json({ 
      success: true, 
      message: 'Formulaire reçu avec succès !',
      data: formData
    });
  } catch (error) {
    console.error('❌ Erreur sauvegarde:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la sauvegarde' 
    });
  }
});

// Route pour voir tous les messages
app.get('/messages', (req, res) => {
  try {
    const data = fs.readFileSync(messagesFile, 'utf8');
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ error: 'Erreur lecture messages' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 =====================================');
  console.log('🚀 SERVEUR DÉMARRÉ !');
  console.log('🚀 =====================================');
  console.log('');
  console.log('📍 Formulaire : http://localhost:' + PORT);
  console.log('📋 Messages   : http://localhost:' + PORT + '/messages');
  console.log('');
  console.log('⏹️  Pour arrêter : Ctrl+C');
  console.log('');
});

