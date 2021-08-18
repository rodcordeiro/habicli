const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const api = require(join(__dirname,"..","tools","api.js"));
const config = require(join(__dirname,"..","tools","config.js"));
const Spinner = require(join(__dirname,"..","tools","loader.js"));

const spinner = new Spinner();

async function complete(id,headers){
    return new Promise(async(resolve,reject)=>{
        await api.post("/tasks/b322a291-87c4-490e-8bf6-2b7087538929/score/up",{},{
            headers
            })
    })
}

const Todo = new Command('todo')
    .helpOption("-h,--help","User functionallity")
    .description("Todoenticate, show user status and logoff from API")
    .helpOption("-h,--help","Login to habitica API")
    .action(async(options)=>{
        spinner.start("Asking the oracle for the provisions...\n")
        const headers = config.get('api')

        if(!headers){
            console.log(chalk.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"))
            console.log()
            console.log(chalk.greenBright("  habicli auth login   "))
            console.log()
            return;
        } else {
            let tasks = [];
            await api.get("/tasks/user?type=todos",{
                headers
            })
                .then(response=>{
                    spinner.text = "Ok, He answered me. Let me read the cards"
                    response.data.data.map(task=>{
                        tasks.push({
                            text:task.text,
                            id:task.id,
                            notes:task.notes,
                            checklist:task.checklist,
                            completed:task.completed
                        })
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            
            spinner.succeed("Here they're. Please choose one");
            spinner.stop();
            
            const choose = await inquirer.prompt([{
                type: 'list',
                name: 'task',
                message: 'Choose a task',
                choices: tasks.map(task=>{
                    return task.text
                })                       
            }])
            const task = tasks.filter(task=>task.text == choose.task)[0]
        const message = `   Name :${task.text}\n\nDescription: ${task.notes}`
        console.log(chalk.cyanBright(message))
        }
        
    })


module.exports = Todo