import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

import config from '../../../utils/config';
import Spinner from '../../../utils/loader';
import { getTags, lineBreak, ATTRIBUTE, iTag } from '../../../utils';
import { unauthorizedMessage } from '../../../utils/unauthorized';
import { getDailies } from '../api';
import { iDailys } from '../api/interface';
import { renderDailies } from '../utils';

const spinner = new Spinner().spinner;

const View = new Command('view')
  .alias('v')
  .description('View dailies.')
  .helpOption('-h,--help', 'View all dailies')
  .action(async () => {
    spinner.start('Asking the oracle for the provisions...\n');
    try {
      const headers = config.get('api');

      if (!headers) {
        unauthorizedMessage(spinner);
        return;
      } else {
        const uTags = await getTags(headers);
        const dailies = await getDailies(headers)
          .then((response) => {
            spinner.succeed('Oh, here they are! Please choose one sir.');
            return renderDailies(response.data, uTags.data);
          })
          .catch((err: Error) => {
            throw err;
          });
        spinner.stop();
        const choose = await inquirer.prompt([
          {
            type: 'list',
            name: 'daily',
            message: 'Choose a task',
            choices: dailies.map((daily) => {
              return daily.text;
            }),
          },
        ]);

        const daily = dailies.find(
          (daily: iDailys) => daily.text == choose.daily,
        );
        // console.log(daily);
        let message = `  ### ${daily?.text} ###`;
        if (daily?.notes) message += `\n ${daily.notes}`;

        lineBreak();
        console.log(chalk.cyanBright(message));
        if (daily?.checklist) {
          console.log('\n Checklist items:');
          daily.checklist.map((item) => {
            console.log(`   [${item.completed ? 'x' : ' '}] ${item.text}`);
          });
        }
        lineBreak();
        process.exit();
      }
    } catch (error) {
      spinner.fail(`Oh no. got error: ${error}`);
      spinner.stop();
      process.exit(1);
    }
  });

export { View };
