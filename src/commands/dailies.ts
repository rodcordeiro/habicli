import { Command } from 'commander';
import inquirer from 'inquirer'
import chalk from 'chalk'

import api from '../tools/api';
import config from '../tools/config';
import Spinner from '../tools/loader';
import { PRIORITIES, iChecklistItem, iTag, ATTRIBUTE } from '../tools/defaults';
import { exit } from 'process';

const spinner = new Spinner().spinner;

const lineBreak = ()=> console.log('________________________________________________________\n')

enum FREQUENCY{
    daily="daily",
    weekly="weekly",
    monthly="monthly",
    yearly="yearly"
}

interface iDailys{
    text: string;
    notes: string;
    id: string;
    checklist: Array<iChecklistItem>
    attribute: ATTRIBUTE
    daysOfMonth: number[]
    weeksOfMonth: number[]
    priority: PRIORITIES
    tags: Array<iTag>
    isDue: boolean
    completed: boolean
    frequency: FREQUENCY,
    everyX: number
    streak: number
    repeat: {
      m: boolean
      t: boolean
      w: boolean
      th: boolean
      f: boolean
      s: boolean
      su: boolean
    }
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

const Dailies = new Command('daily')
    .alias('d')
    .description("Manage Dailys tasks.")
    .helpOption("-h,--help","Provides todo functionallity. Allows to list, edit, update, score, create and delete daily tasks")
    .action(async()=>{
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
            const uTags : any = await getTags(headers)
            const dailies : any = await api.get("/tasks/user?type=dailys",{headers})
                .then((response:any)=>{
                    let dailies : Array<iDailys> = []
                    response.data.data.map((daily:any)=>{
                        dailies.push({
                            text:daily.text,
                            notes:daily.notes,
                            id:daily.id,
                            checklist:daily.checklist,
                            attribute:daily.attribute,
                            daysOfMonth:daily.daysOfMonth,
                            weeksOfMonth:daily.weeksOfMonth,
                            priority:daily.priority,
                            tags:daily.tags.map((tag: string)=>uTags.filter((t: iTag)=>t.id == tag)[0]),
                            isDue:daily.isDue,
                            completed:daily.completed,
                            frequency:daily.frequency,
                            everyX:daily.everyX,
                            streak:daily.streak,
                            repeat:daily.repeat
                        })
                    })
                    spinner.succeed("Here they're. Please choose one");
                    return dailies
                })
                .catch((err:Error)=>{
                    spinner.fail(`Oh no. got error: ${err}`)
                    console.log(err)
                })
            spinner.stop()
            const choose = await inquirer.prompt([{
                type: 'list',
                name: 'daily',
                message: 'Choose a task',
                choices: dailies.map((daily: iDailys)=>{
                    return daily.text
                })                       
            }])
            
            const daily : iDailys = dailies.filter((daily: iDailys)=>daily.text == choose.daily)[0]
            let message = `  ### ${daily.text} ###`
            if (daily.notes) message += `\n${daily.notes}`
            
            lineBreak()
            console.log(chalk.cyanBright(message))
            lineBreak()
            
        }
    })
export {
    Dailies
}