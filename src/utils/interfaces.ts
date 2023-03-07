import { iAuthenticatedUser } from './authenticated_user';

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

interface iUser {
  username: string;
  id: string;
  profile: iAuthenticatedUser['data']['profile'];
  stats: iAuthenticatedUser['data']['stats'] & { mainAttr: string };
}

export { iChallenge, iChecklistItem, iHeaders, iTag, iUser };
