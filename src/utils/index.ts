export * from './api';
export * from './config';
export * from './defaults';
export * from './editor';
export * from './interfaces';
export * from './loader';
export * from './authenticated_user';

export const lineBreak = () =>
  console.log('________________________________________________________\n');

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.substring(1);
}
