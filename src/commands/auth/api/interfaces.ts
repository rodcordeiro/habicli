export interface iAuthenticated {
  success: boolean;
  data: {
    id: string;
    apiToken: string;
    newUser: boolean;
    username: string;
  };
  appVersion: string;
}
