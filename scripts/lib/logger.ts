import * as chalk from 'chalk';

export const logger = (name: string) => (message: string) => {
  const d = new Date();

  const _name = chalk.bold(`[${name}]`);
  const _timestamp = chalk.gray(
    `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
  );
  const _message = chalk.white(message);

  console.log(_name, _timestamp, _message);
};
