const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const { exit } = require('process');
const api = require(join(__dirname,"..","tools","api.js"));
const config = require(join(__dirname,"..","tools","config.js"));
const Spinner = require(join(__dirname,"..","tools","loader.js"));

const spinner = new Spinner();
const lineBreak = ()=> console.log('-----------------------------------------------------------------')

async function complete(id,headers){
    return new Promise(async(resolve,reject)=>{
        await api.post(`/tasks/${id}/score/up`,{},{
            headers
            })
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>reject(err))
    })
}
async function completeChecklistItem(task_id,item_id,headers){
    return new Promise(async(resolve,reject)=>{
        await api.post(`/tasks/${task_id}/checklist/${item_id}/score`,{},{
            headers
            })
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>reject(err))
    })
}

async function listTasks(headers){
    return new Promise(async(resolve,reject)=>{
        let tasks = [];
        await api.get("/tasks/user?type=habits",{
            headers
        })
            .then(response=>{
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
                reject(err)
            })
        resolve(tasks)
    })
}

const Habit = new Command('habit')
    .helpOption("-h,--help","User functionallity")
    .description("Todoenticate, show user status and logoff from API")
    .helpOption("-h,--help","Login to habitica API")
    .action(async(options)=>{
        spinner.start("Asking the oracle for the provisions...\n")
        const headers = config.get('api')

        if(!headers){
            lineBreak()
            console.log(chalk.cyanBright("Oh, wait. I don't know you yet. Please, login first with the command bellow"))
            console.log()
            console.log(chalk.greenBright("  habicli auth login   "))
            lineBreak()
            spinner.stop();
            return;
        } else {
            let tasks = await listTasks(headers)
                        .then(response=>{
                            spinner.succeed("Here they're. Please choose one");
                            return response
                        })
                        .catch(err=>{
                            spinner.fail(err)
                        })
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
            
            const message = `  Name :${task.text}\n\nDescription: ${task.notes}`
            lineBreak()
            console.log(chalk.cyanBright(message))
            lineBreak()
            const action_choices = [
                "Complete",
                "Close"
            ]
            if(task.checklist.length >= 1){
                action_choices.push("Show checklist")
            }
            const action = await inquirer.prompt([{
                type: 'list',
                name: 'action',
                message: 'What are we going to do?',
                choices: action_choices
            }]).then(act=>{
                return act.action
            })
            
            switch(action){
                case "Show checklist":
                    const item = await inquirer.prompt([{
                        type: 'list',
                        name: 'item',
                        message: 'Choose an item from the checklist:',
                        choices: task.checklist.map(item=>item.text)
                    }]).then(item=>{
                        return task.checklist.filter(i=>i.text == item.item)[0]
                    })
                    const item_action = await inquirer.prompt([{
                        type: 'list',
                        name: 'action',
                        message: 'What are we going to do?',
                        choices: [
                            "Complete",
                            "Exit"
                        ]
                    }]).then(act=>{
                        return act.action
                    })
                    if(item_action == "Complete"){
                        await completeChecklistItem(task.id,item.id,headers)
                            .then(response=>{
                                console.log(chalk.cyanBright("Item completed."))
                            })
                            .catch(err=>{
                                console.log(chalk.redBright(err))
                            })
                    }
                    break;
                case "Complete":
                    const data = await complete(task.id,headers)
                        .then(response=>{
                            return response
                        })
                        .catch(error=>{
                            console.error(error)
                            return;
                        })
                    console.log(chalk.cyanBright("Task completed"))
                    break;
                case "Close":
                    exit(0)
            }
    
    }        
    })


module.exports = Habit