import { ipcMain } from 'electron';

export default async function callFrontend({
  eventName,
  functionExec,
  context,
}) {
  if (!eventName) {
    throw new Error('eventName is required');
  }

  if (!functionExec) {
    throw new Error('functionExec is required');
  }

  const exec = functionExec.bind(context);

  ipcMain.on(eventName, async function(event, arg) {
    const response = await exec(arg);

    event.reply(eventName, response);
  });
}
