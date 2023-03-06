import chalk from 'chalk';
import { lineBreak } from './index';
import { Ora } from 'ora';

export function unauthorizedMessage(spinner?: Ora) {
  lineBreak();
  console.log(
    chalk.cyanBright(
      "Oh, wait. I don't know you yet. Please, login first with the command bellow",
    ),
  );
  console.log();
  console.log(chalk.greenBright('  habicli auth login   '));
  lineBreak();
  if (spinner) {
    spinner.stop();
  }
}
