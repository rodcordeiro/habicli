import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

import config from '../../../utils/config';
import Spinner from '../../../utils/loader';
import {
  getTags,
  lineBreak,
  ATTRIBUTE,
  iTag,
  PRIORITIES,
} from '../../../utils';
import { unauthorizedMessage } from '../../../utils/unauthorized';
import { getDailies } from '../api';
import { iDailys } from '../api/interface';
import { renderDailies } from '../utils';

const spinner = new Spinner().spinner;

const Create = new Command('create')
  .alias('c')
  .description('Create a new daily.')
  .helpOption('-h,--help', 'Create a new daily')
  .action(async () => {
    try {
      console.info(
        chalk.cyan('New daily incomning... We must register it now!'),
      );
      const headers = config.get('api');

      if (!headers) {
        unauthorizedMessage(spinner);
        return;
      }
      const tags = await getTags(headers);

      const data = await inquirer.prompt([
        {
          type: 'input',
          name: 'text',
          message: 'Describe your daily: ',
          validate: (input) => input !== '' && input !== undefined,
        },
        {
          type: 'input',
          name: 'notes',
          message: 'Tell me more about your daily: ',
        },
        {
          type: 'list',
          choices: ['empty', ...tags.data.map((tag) => tag.name)],
          name: 'tags',
          message: 'Should we link a tag?',
        },
        {
          type: 'list',
          choices: ['trivial', 'easy', 'medium', 'hard'],
          name: 'priority',
          default: PRIORITIES.Easy,
          message: 'What is the priority of this daily? ',
        },
      ]);
      data.tags = [
        data.tags === 'empty'
          ? undefined
          : // @ts-ignore
            tags.data.find((t) => t.name === data.tags).id,
      ];
      console.log(data);

      // export interface ICreateDailyProps {
      //   text: string;
      //   type: string;
      //   notes: string;
      //   tags: string[];
      //   priority: PRIORITIES;
      //   attribute: ATTRIBUTE;
      // }
    } catch (error) {
      spinner.fail(`Oh no. got error: ${error}`);
      spinner.stop();
      process.exit(1);
    }
  });

export { Create };
