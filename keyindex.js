const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
var chalk = require('chalk');
var prompt = require('prompt');
var Wallet = require('./wallet');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})
app.post('/generate',urlencodedParser, function (req, res) {
    result=req.body.Random;
    var myWallet = Wallet.generate();
    var myV3 = myWallet.toV3String(result);
    var myPrivateKey = myWallet.getPrivateKeyString();
    var myPublicKey = myWallet.getPublicKeyString();
    var myAddress = myWallet.getAddressString();
    response = {
        Private_key:myPrivateKey,
        Public_key:myPublicKey,
        Address:myAddress
     };
     res.end(JSON.stringify(response));
 })


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))