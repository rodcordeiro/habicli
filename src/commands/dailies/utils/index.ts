import { iTag } from '../../../utils';
import { iDailyResponse, iDailys } from '../api/interface';

export function renderDailies(dailies: iDailyResponse['data'], tags: iTag[]) {
  let data: Array<iDailys> = [];
  dailies.map((daily) => {
    data.push({
      text: daily.text,
      notes: daily.notes,
      id: daily.id,
      checklist: daily.checklist,
      //   @ts-ignore
      attribute: daily.attribute,
      daysOfMonth: daily.daysOfMonth,
      weeksOfMonth: daily.weeksOfMonth,
      priority: daily.priority,
      tags: daily.tags.map(
        (tag: string) => tags.filter((t: iTag) => t.id == tag)[0],
      ),
      isDue: daily.isDue,
      completed: daily.completed,
      //   @ts-ignore
      frequency: daily.frequency,
      everyX: daily.everyX,
      streak: daily.streak,
      repeat: daily.repeat,
    });
  });
  return data;
}
