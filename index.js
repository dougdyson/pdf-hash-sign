const path = require('path');
const express = require('express');
const MetaMaskOnboarding = require('@metamask/onboarding');
const { encrypt, recoverPersonalSignature } = require('@metamask/eth-sig-util');

const { isMetaMaskInstalled } = MetaMaskOnboarding;

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

