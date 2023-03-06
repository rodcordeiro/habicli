
interface iTag {
  id: string;
  name: string;
  challenge?: boolean;
}

interface iChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}
interface iHeaders {
  'x-client': string;
  'Content-Type': string;
  'x-api-key': string;
  'x-api-user': string;
}

interface iChallenge {
  taskId: string;
  id: string;
  shortName: string;
}

export { iChallenge, iChecklistItem, iHeaders, iTag };
