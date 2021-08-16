const ora = require('ora');
class Spinner{
    constructor(){
        this.spinner = ora();
        this.spinner.spinner = "bounce";   
        return this.spinner;
    }
}
module.exports = Spinner