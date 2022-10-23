const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const MetaMaskOnboarding = require('@metamask/onboarding');
const { encrypt, recoverPersonalSignature } = require('@metamask/eth-sig-util');
const keccak256 = require('keccak256');

const { isMetaMaskInstalled } = MetaMaskOnboarding;

const app = express();

app.use(fileUpload());
app.use('/', express.static(path.join(__dirname, 'public')));

// TODO: handle MetaMask not being installed with onboarding
(isMetaMaskInstalled) ? console.log('MetaMask is installed') : console.log('MetaMask is not installed');

app.post('/extract-text', (req, res) => {
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.pdfFile).then((result) => {
    // TODO: parse and append PDF meta data to response
    const { text } = result;
    const hash = keccak256(result.text).toString('hex');
    const extractedPDF = {
      text,
      hash,
    };
    res.send(extractedPDF);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});


