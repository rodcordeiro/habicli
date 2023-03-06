import { Command } from 'commander';
import { View } from './subcommands/view';
import { Create } from './subcommands/create';
const Dailies = new Command('daily')
  .alias('d')
  .description('Manage Dailys tasks.')
  .helpOption(
    '-h,--help',
    'Provides dailies functionallity. Allows to list, edit, update, score, create and delete daily tasks',
  );

Dailies.addCommand(View);
Dailies.addCommand(Create);
export { Dailies };
