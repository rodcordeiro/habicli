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
  CLASS_ATTR,
  iUser,
  getClassAttr,
} from '../../../utils';
import { unauthorizedMessage } from '../../../utils/unauthorized';
import { create, getDailies } from '../api';
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

      data.tags =
        data.tags === 'empty'
          ? undefined
          : // @ts-ignore
            [tags.data.find((t) => t.name === data.tags).id];

      data.priority = PRIORITIES[data.priority];

      const user: iUser = config.get('user');
      const payload = { ...data, attribute: user.stats.mainAttr };

      if (data.tags) {
        let { add_tags } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'add_tags',
            message: 'Would you like to add more tags?',
          },
        ]);

        while (add_tags) {
          const prompt = await inquirer.prompt([
            {
              type: 'list',
              choices: tags.data.map((tag) => tag.name),
              name: 'tags',
              message: 'Wich tag should I Link?',
            },
            {
              type: 'confirm',
              name: 'confirm',
              message: 'Add more tags',
            },
          ]);
          // @ts-ignore
          data.tags.push(tags.data.find((t) => t.name === prompt.tags).id);
          if (!prompt.confirm) {
            add_tags = false;
          }
        }
      }

      spinner.start('Ok, registering it.');
      await create(payload, headers).then(() => {
        spinner.succeed('Daily registered, make it worth!');
        spinner.stop();
        process.exit(0);
      });
    } catch (error) {
      console.error(error);
      spinner.fail(`Oh no. got error: ${error}`);
      spinner.stop();
      process.exit(1);
    }
  });

export { Create };
