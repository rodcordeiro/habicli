import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import config from '../../utils/config';
import Spinner from '../../utils/loader';
import { authenticate } from './api';
const spinner = new Spinner().spinner;

const auth = new Command('auth');

auth.helpOption('-h,--help', 'User functionallity');
auth.description('Authenticate, show user status and logoff from API');

//Login command
auth
  .command('login')
  .name('login')
  .helpOption('-h,--help', 'Login to habitica API')
  .option('-u,--username [username]', 'Username to be used')
  .action(async (options) => {
    try {
      const { username } = options.username
        ? options
        : await inquirer.prompt([
            {
              type: 'input',
              name: 'username',
              message: 'Please type your username: ',
              validate: (value) => (value ? true : 'Please enter your name'),
            },
          ]);
      const { password } = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: 'Please enter your password',
          validate: (value) => (value ? true : 'You must enter your password'),
        },
      ]);
      spinner.start('Asking the oracle for the provisions...\n');
      const { id, apiToken } = await authenticate(username, password)
        .then((response) => {
          spinner.text =
            'Oh, look, the stars recognized you! Let me read what they say, just a moment.';
          return response.data;
        })
        .catch((err) => {
          throw err;
        });
      let api_config = config.get('api');
      api_config['x-api-key'] = apiToken;
      api_config['x-api-user'] = id;

      await config.set({ user: { username, id } });
      await config.set({ api: api_config });

      spinner.succeed(
        `Oh yeah, welcome ${username}. Come in, take a sit. It's a pleasure work with you.`,
      );
      spinner.stop();
    } catch (error: any) {
      spinner.fail(
        chalk.redBright(
          `Oh no. It seems a cloud is over the stars, I cannot see them clearly.\n The last thing I saw was ...\n\n${error}`,
        ),
      );
      //   console.error(error.message);
      spinner.stop();
    }
  });

export { auth };
