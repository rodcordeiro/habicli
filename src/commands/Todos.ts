import { Command } from 'commander';
import inquirer from 'inquirer'
import chalk from 'chalk'

import api from '../tools/api';
import config from '../tools/config';
import Spinner from '../tools/loader';
import { PRIORITIES, ATTRIBUTE, iTag, iChecklistItem } from '../tools/defaults';
import { exit } from 'process';

const spinner = new Spinner().spinner;

const lineBreak = ()=> console.log('________________________________________________________\n')


interface iTask{
    text :string
    id ?:string
    notes:string
    checklist:Array<iChecklistItem>
    tags: Array<iTag>
    priority?: PRIORITIES
    attribute: ATTRIBUTE
    completed:boolean
    type: string
}

async function complete(id: string | undefined,headers: Object){
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
async function getTags(headers: Object){
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
async function completeChecklistItem(task_id: string | undefined,item_id: string,headers: Object){
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

async function listTasks(headers: Object) : Promise<Array<iTask> | Error>{
    return new Promise(async(resolve,reject)=>{
        let tasks : Array<iTask>= [];
        await api.get("/tasks/user?type=todos",{
            headers
        })
            .then(async (response: any)=>{
                const uTags : any = await getTags(headers)
                response.data.data.map((task: any)=>{

                    tasks.push({
                        text:task.text,
                        id:task.id,
                        notes:task.notes,
                        checklist:task.checklist,
                        completed:task.completed,
                        tags:task.tags.map((tag: string)=>uTags.filter((t: iTag)=>t.id == tag)[0]),
                        type: task.type,
                        attribute: task.attribute
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
    .alias('t')
    .description("Manage todo tasks.")
    .helpOption("-h,--help","Provides todo functionallity. Allows to list, edit, update, score, create and delete todo tasks")
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
            let tasks : any = await listTasks(headers)
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
                choices: tasks.map((task: iTask)=>{
                    return task.text
                })                       
            }])
            
            const task : iTask = tasks.filter((task: iTask)=>task.text == choose.task)[0]
            
            let message = `  ### ${task.text} ###`
            if (task.notes) message += `\n${task.notes}`
            
            lineBreak()
            console.log(chalk.cyanBright(message))
            lineBreak()
            
            const action_choices = [
                "Complete",
                "Update",
                "Delete",
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
                            "Delete",
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
                    if(item_action == "Delete"){
                        await api.delete(`/tasks/${task.id}/checklist/${item.id}`,{headers})
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
                case "Delete":
                    await api.delete(`/tasks/${task.id}`,{headers})
                        .then(response=>{
                            console.log(chalk.cyanBright("Task deleted"))
                        })
                        .catch(error=>{
                            console.log(chalk.redBright(error))
                        })
                    break;
                case "Update":
                    const { choice } = await inquirer.prompt([{
                        type:'list',
                        name:'choice',
                        message: "What do you want to upadate?",
                        choices: [
                            'Title',
                            'Notes',
                            'Tags',
                            'Add checklist item'
                        ]
                    }])
                    if(choice == 'Title'){
                        const text = await inquirer.prompt([{
                            type: 'string',
                            name: 'text',
                            message: "Type the new task title:",
                            default: task.text
                        }]).then(response=>response.text)
                        await api.put(`/tasks/${task.id}`,{
                            text
                        },{headers})
                            .then(response=>{
                                console.log(chalk.cyanBright("Updated"))
                            })
                            .catch(err=>{
                                console.log(chalk.redBright(err))
                            })
                    }
                    if(choice == 'Notes'){
                        const notes = await inquirer.prompt([{
                            type: 'string',
                            name: 'notes',
                            message: "Type the new task description:",
                            default: task.notes
                        }]).then(response=>response.notes)
                        await api.put(`/tasks/${task.id}`,{
                            notes
                        },{headers})
                            .then(response=>{
                                console.log(chalk.cyanBright("Updated"))
                            })
                            .catch(err=>{
                                console.log(chalk.redBright(err))
                            })
                    }
                    if(choice == 'Tags'){
                        console.log(`Existing tags are:${task.tags.map((tag: iTag)=>` ${tag.name}`)}`)
                        let { choice } = await inquirer.prompt([{
                            type:'list',
                            name:'choice',
                            message: "What do you want to do?",
                            choices: [
                                'Add tags',
                                'Remove tags',
                                "Exit"
                            ]
                        }])
                        if(choice == "Add tags"){
                            let tags : any = await getTags(headers)
                            tags.push({name:"Empty"})
                            await inquirer.prompt([{
                                type: 'list',
                                name: 'tag',
                                message: "Please, select the tag to be added",
                                choices: tags.map((tag: iTag)=>tag.name)
                            }]).then(async (response)=>{
                                if(response.tag != 'Empty'){
                                    let tag = tags.filter((t: iTag)=>t.name == response.tag)[0]
                                    await api.post(`/tasks/${task.id}/tags/${tag.id}`,{},{headers}).catch(err=>console.log(chalk.redBright(err)))
                                } else {
                                    exit()
                                }
                            })
                        }
                        if(choice == "Remove tags"){
                            let tags : Array<iTag> = task.tags
                            await inquirer.prompt([{
                                type: 'list',
                                name: 'tag',
                                message: "Select tag to remove: ",
                                choices: tags.map((tag: iTag)=>tag.name)
                            }]).then(async (response)=>{
                                if(response.tag != 'Empty'){
                                    let tag = tags.filter((t: iTag)=>t.name == response.tag)[0]
                                    await api.delete(`/tasks/${task.id}/tags/${tag.id}`,{headers}).catch(err=>console.log(chalk.redBright(err)))
                                } else {
                                    exit()
                                }
                            })
                        }
                    }
                    if(choice == 'Add checklist item'){
                        let text = "1"
                        while(text){
                            text = await inquirer.prompt([{
                                type: 'string',
                                name: 'text',
                                message: "Please, type the item text: [leave it empty for exit]",
                                default: task.text
                            }]).then(response=>response.text)
                            await api.post(`/tasks/${task.id}/checklist`,{
                                text
                            },{headers})
                                .then(response=>{
                                    console.log(chalk.cyanBright("Item included"))
                                })
                                .catch(err=>{
                                    console.log(chalk.redBright(err))
                                })
                        }
                    }
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
    let task : any = {
        type: 'todo'
    }
    
    task['text'] = title;
    if(notes) task['notes'] = notes;
    task['priority'] = PRIORITIES[priority]
    task['attribute'] = ATTRIBUTE['Intelligence']

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
export {
    Todo,
    iTag,
    iTask
}