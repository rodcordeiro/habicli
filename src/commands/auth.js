const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const api = require(join(__dirname,"..","tools","api.js"));
const config = require(join(__dirname,"..","tools","config.js"));
const Spinner = require(join(__dirname,"..","tools","loader.js"));

const spinner = new Spinner();

const auth = new Command('auth')
auth.helpOption("-h,--help","User functionallity")
auth.description("Authenticate, show user status and logoff from API");

//Login command
auth
    .command("login")
    .name("login")
    .helpOption("-h,--help","Login to habitica API")
    .option("-u,--username [username]","Username to pe used")
    .action(async(options)=>{
        const username = options.username ? options.username : await inquirer.prompt([
            {
                type: 'input',
                name: 'username',
                message: 'Please type your username',
                validate: value => value ? true : 'Please enter your name'
            }
        ])
    const { password } = await inquirer.prompt([
            {
                type: 'password',
                name: 'password',
                message: 'Please enter your password',
                validate: value => value ? true : 'You must enter your password'
            }
        ])
        spinner.start("Connecting to API")
        const {id,apiToken} = await api.post("/user/auth/local/login",{
            username,
            password
        },{
            'Content-Type': 'application/json'
        })
        .then(res=>{
            spinner.text = "Validating data"
            console.log({data:res.data})
            return res.data.data
        })
        .catch(err=>{
            console.log({err})
            spinner.fail(chalk.redBright(err))
        })
        
        let api_config = config.get("api")
        api_config["x-api-key"] = apiToken
        api_config["x-api-user"] = id
        
        await config.set({user:{username,id}})
        await config.set({api: api_config})
        
        spinner.succeed("Connected")
        spinner.stop()
    })
    
auth.command("stats")
    .description("Retrieves user information")
    .helpOption("-h,--help","Retrieves user information through API.")
    .action(async()=>{
        spinner.start("Asking the oracle for the provisions...\n")
        const headers = config.get("api")
        // const data = await api.get("/user",{},{headers:{
        //     'x-client':headers['x-client'],
        //     'x-api-key':headers['x-api-key'],
        //     'x-api-user':headers['x-api-user'],
        // }})
        //     .then(response=>{
        //         spinner.text = "Receiving the prophecies"
        //         return response.data.data
        //     })
        //     .catch(err=>{
        //         // console.log(err)
        //         spinner.fail(chalk.redBright(`Oh no, lost connection. Last thing I saw was...\n${err}`))
        //         throw new Error(err)
        //     })
        spinner.succeed(`Got it, the oracle tolde me!\n`)
        spinner.stop()
        // {party,stats,profile,guilds,challenges}
    })

module.exports = auth;