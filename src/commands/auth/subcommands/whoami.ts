import { Command } from 'commander';
import chalk from 'chalk';
import config from '../../../utils/config';
import Spinner from '../../../utils/loader';
import { getAuthenticatedUser } from '../api';
import { unauthorizedMessage } from '../../../utils/unauthorized';
import { capitalize, getClassAttr } from '../../../utils';
const spinner: Spinner['spinner'] = new Spinner().spinner;

const Whoami = new Command('whoami');

Whoami.helpOption('-h,--help', 'User functionallity');
Whoami.description('Display user information');
Whoami.action(async (options) => {
  try {
    const headers = config.get('api');
    spinner.start('Hmmm, who is here today...');

    if (!headers) {
      unauthorizedMessage(spinner);
      return;
    }

    const user = await getAuthenticatedUser(headers);

    const {
      data: { stats, profile },
    } = user;
    const userConfig = config.get('user');

    config.set({
      user: {
        ...userConfig,
        stats: { ...stats, mainAttr: getClassAttr(capitalize(stats.class)) },
        profile,
      },
    });
    spinner.succeed(
      `Oh, look, the stars recognized you ${user.data.profile.name}! Let me read what they say, just a moment.`,
    );
    spinner.stop();
    process.exit(0);
  } catch (error: any) {
    spinner.fail(
      chalk.redBright(
        `Oh no. It seems a cloud is over the stars, I cannot see them clearly.\n The last thing I saw was ...\n\n${error}`,
      ),
    );
    //   console.error(error.message);
    spinner.stop();
    process.exit(1);
  }
});

export { Whoami };
