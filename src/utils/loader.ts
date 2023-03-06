import ora, {Ora} from 'ora'

class Spinner{
    public spinner : Ora;
    constructor() {
        this.spinner = ora();
        this.spinner.spinner = "bounce";   
        return this
    }
}
export default Spinner