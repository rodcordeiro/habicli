const Configstore = require('configstore');
const Path = require('path');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync(Path.resolve(__dirname,"..","..",'package.json'), 'utf8'));

// Create a Configstore instance.
const config = new Configstore(pkg.name,{version:pkg.version});

module.exports = config
