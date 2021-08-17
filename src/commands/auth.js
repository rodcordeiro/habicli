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
                message: 'Please type your username: ',
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
        spinner.start("Asking the oracle for the provisions...\n")
        const {id,apiToken} = await api.post("/user/auth/local/login",{
            username,
            password
        },{
            'Content-Type': 'application/json'
        })
        .then(res=>{
            spinner.text = "Oh, look, the stars recognized you! Let me read what they say, just a moment."
            return res.data.data
        })
        .catch(err=>{
            console.log({err})
            spinner.fail(chalk.redBright(`Oh no. It seems a cloud is over the stars, I cannot see them clearly.\n The last thing I saw was ...\n\n${err}`))
            throw new Error(err)
        })
        
        let api_config = config.get("api")
        api_config["x-api-key"] = apiToken
        api_config["x-api-user"] = id
        
        await config.set({user:{username,id}})
        await config.set({api: api_config})
        
        spinner.succeed(`Oh yeah, welcome ${username}. Come in, take a sit. It's a pleasure work with you.`)
        spinner.stop()
    })
    
auth.command("stats")
    .description("Retrieves user information")
    .helpOption("-h,--help","Retrieves user information through API.")
    .action(async()=>{
        if(!config.get('user')){
            console.log(chalk.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"))
            console.log()
            console.log(chalk.greenBright("  habicli auth login   "))
            console.log()
            return;
        } else {
            spinner.start("Asking the oracle for the provisions...\n")
            const headers = config.get("api")
            const {party,stats,profile,guilds,challenges} = await api.get('/user',{
                headers
            })
            .then(response=>{
                return response.data.data
            })
            .catch(err=>{
                console.log(chalk.redBright("Oh no, lost connection. The last thing I saw was..."))
                console.error(err)
            })
            
            spinner.succeed(`Got it, the oracle tolde me!\n`)
            spinner.stop()
            console.log(`Your HP is ${Math.floor(stats.hp)}/${stats.maxHealth}`)
            // {party,stats,profile,guilds,challenges}
        }
        
    })

module.exports = auth;