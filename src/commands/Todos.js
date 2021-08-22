const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const { join } = require('path');
const { exit } = require('process');
const api = require(join(__dirname,"..","tools","api.js"));
const config = require(join(__dirname,"..","tools","config.js"));
const Spinner = require(join(__dirname,"..","tools","loader.js"));

const spinner = new Spinner();
const lineBreak = ()=> console.log('________________________________________________________\n')
const PRIORITIES = {
    Trivial: 0.1,
    Easy:1,
    Medium:1.5,
    Hard:2
}

async function complete(id,headers){
    return new Promise(async(resolve,reject)=>{
        await api.post(`/tasks/${id}/score/up`,{},{
            headers
            })
            .then(response=>{
                resolve(response.data.data)
            })
            .catch(err=>reject(err))
    })
}
async function getTags(headers){
    return new Promise(async(resolve,reject)=>{
        await api.get(`/tags`,{
            headers
            })
            .then(response=>{
                resolve(response.data.data)
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
        await api.get("/tasks/user?type=todos",{
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
const Todo = new Command('todo')
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
            
            let message = `  ### ${task.text} ###`
            if (task.notes) message += `\n${task.notes}`
            lineBreak()
            console.log(chalk.cyanBright(message))
            lineBreak()
            const action_choices = [
                "Complete",
                "Update",
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
                    lineBreak()
                    console.log(chalk.cyanBright(`##> ${item.text}`))
                    lineBreak()
            
                    const item_action = await inquirer.prompt([{
                        type: 'list',
                        name: 'action',
                        message: 'What are we going to do?',
                        choices: [
                            "Complete",
                            "Update",
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
                    if(item_action == "Update"){
                        lineBreak()
                        let {text} = await inquirer.prompt([{
                            type: 'string',
                            name: 'text',
                            message: 'Please, type the new item text'
                        }])
                        await api.put(`/tasks/${task.id}/checklist/${item.id}`,{
                            text
                        },{headers})
                        .then(response=>{
                            console.log(chalk.cyanBright("Updated"))
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
                case "Update":
                        task['text'] = await inquirer.prompt([{
                            type: 'string',
                            name: 'text',
                            message: "Update task text?",
                            default: task.text
                        }]).then(response=>response.text)
                        task['notes'] = await inquirer.prompt([{
                            type: 'string',
                            name: 'notes',
                            message: "Update task notes?",
                            default: task.notes
                        }]).then(response=>response.notes)
                        let tags = await getTags(headers)
                        tags.push({name:"Empty"})
                        await inquirer.prompt([{
                            type: 'list',
                            name: 'tag',
                            message: "Add tags: ",
                            choices: tags.map(tag=>tag.name)
                        }]).then(async (response)=>{
                            if(response.tag != 'Empty'){
                                let tag = tags.filter(t=>t.name == response.tag)[0]
                                await api.post(`/tasks/${task.id}/tags/${tag.id}`,{},{headers}).catch(err=>console.log(chalk.redBright(err)))
                            }
                        })
                        
                        await api.put(`/tasks/${task.id}`,task,{headers})
                            .then(response=>{
                                console.log(chalk.cyanBright('updated'))
                            })
                            .catch(err=>{
                                console.log(chalk.redBright(err))
                            })
                        break;
                case "Close":
                    exit(0)
            }    
    }        
    })

Todo.command('create')
.helpOption('-h,--help',"Create a new task on Habitica")
.description("Create a new task on Habitica")
.option("-t,--title [text]","The task title")
.option('-n,--notes [notes]',"The task description")
.option("-p,--priority <priority>","The task priority")
.option("--verbose","Prints the task response")
.action(async(options)=>{
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
    
const {title} = options.title ? options : await inquirer.prompt([{
        type: 'string',
        name: 'title',
        message: "Please enter the task title:"
    }])
    
    const {notes} = options.notes ? options : await inquirer.prompt([{
        type: 'string',
        name: 'notes',
        message: "Do you wish to add some notes? [Press enter to leave blank]",
        default: false,
    }])
    
    const {priority} = options.priority ? options : await inquirer.prompt([{
        type: 'list',
        name: 'priority',
        default:'Easy',
        message: "Do you want to change the task level?",
        choices: ["Trivial", "Easy", 'Medium', 'Hard'],
    }])
    spinner.start("Asking the oracle for the provisions...\n")
    const task = {
        type: 'todo'
    }
    
    task['text'] = title;
    if(notes) task['notes'] = notes;
    task['priority'] = PRIORITIES[priority]

    await api.post('/tasks/user',task,{headers})
        .then(response=>{
            if(!options.verbose){
                spinner.succeed(chalk.cyanBright("Task created"))
            } else {
                spinner.succeed(chalk.cyanBright(JSON.stringify(response.data.data)))
            }
        })
        .catch(err=>{
            spinner.fail(chalk.redBright(err))
        })
    spinner.stop()
}
})
module.exports = Todo