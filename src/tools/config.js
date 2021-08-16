const Configstore = require('configstore');
const Path = require('path');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync(Path.resolve(__dirname,"..","..",'package.json'), 'utf8'));

// Create a Configstore instance.
const config = new Configstore(pkg.name,{
    version:pkg.version,
    api:{
        "x-client": "c150cf43-bf4a-4c46-8912-9c04f77d3924-cordeiroAPI",
        'Content-Type': 'application/json'
    }
});

module.exports = config
