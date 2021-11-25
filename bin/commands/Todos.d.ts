import { Command } from 'commander';
import { PRIORITIES, ATTRIBUTE, iTag, iChecklistItem } from '../tools/defaults';
interface iTask {
    text: string;
    id?: string;
    notes: string;
    checklist: Array<iChecklistItem>;
    tags: Array<iTag>;
    priority?: PRIORITIES;
    attribute: ATTRIBUTE;
    completed: boolean;
    type: string;
}
declare const Todo: Command;
export { Todo, iTag, iTask };
