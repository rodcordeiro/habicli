const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const api = require(join(__dirname,"..","tools","api.js"));
const config = require(join(__dirname,"..","tools","config.js"));
const Spinner = require(join(__dirname,"..","tools","loader.js"));

const spinner = new Spinner();

const Todo = new Command('todo')
    .helpOption("-h,--help","User functionallity")
    .description("Todoenticate, show user status and logoff from API")
    .helpOption("-h,--help","Login to habitica API")
    .action(async(options)=>{
        spinner.start("Asking the oracle for the provisions...\n")

        const headers = config.get('api')

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
        console.log(task)
    })

module.exports = Todo