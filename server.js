const MqttService = require('./mqtt.service.js');
const http = require('http');

const mqttService = new MqttService();

let express = require('express');
let bodyParser = require('body-parser');
let gcm = require('node-gcm');
let app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To server static assests in root dir
app.use(express.static(__dirname));

//To allow cross origin request
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// -------- Wheather API
function obterInformacoesTempo() {
  return new Promise((resolve, reject) => {

    http.get('http://api.openweathermap.org/data/2.5/weather?q=Maringa&units=metric&APPID=a4d11680e87c3f9295955a77cf063442', function(res) {
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var dadosTempo = JSON.parse(body);
          resolve({
            temperatura: dadosTempo.main.temp.toString() + ' °C',
            umidade: dadosTempo.main.humidity.toString() + '%',
            luminosidade: '124351 lx',
            statusSistema: 'Em funcionamento'
          });
      });
    });

  });
}

// -------- Leitura API

app.get('/dashboard-data', async function(req, res) {
  let informacoesTempo = await obterInformacoesTempo();
  res.send(JSON.stringify(informacoesTempo));
});

app.get('/dados-abastecimento', function(req, res) {
  res.send(JSON.stringify([{
      exibir: false,
      capacidadeAtual: '450 mL',
      capacidadeTotal: '2,5 L',
      status: true
  }]));
});

app.get('/dados-plantas', async function(req, res) {
  console.log('enviando comando "planta"');

  mqttService.obterPlantas().then(data => {
    console.log('retorno comando plantas');
  });


  res.send(JSON.stringify([
      {
          umidade: '60%',
          luminosidade: '39363,30 lx',
          temperatura: '32 °C',
          borda: '#00A563'
      },
      {
          umidade: '1%',
          luminosidade: '39363,30 lx',
          temperatura: '25 °C',
          borda: '#DE8932'
    }]
  ));
});

// -------- Escrita API

app.post('/fechar-abastecimento', function(req, res) {
  res.sendStatus(200);
});

app.post('/abrir-abastecimento', function(req, res) {
  res.sendStatus(200);
});

app.post('/aguar', function(req, res) {
  res.sendStatus(200);
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Local Server : http://localhost:8080');
});
