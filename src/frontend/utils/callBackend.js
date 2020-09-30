const electron = window.require('electron');

const debounceEvent = (fn, wait = 1000) => (...args) =>
  clearTimeout(
    window.timeEvent,
    (window.timeEvent = setTimeout(() => fn(...args), wait)),
  );

export default async function callBackend({ eventName, data }) {
  const promise = await new Promise((resolve, reject) => {
    try {
      const handleEvent = debounceEvent(() => {
        electron.ipcRenderer.send(eventName, data);

        electron.ipcRenderer.once(eventName, (_, resp) => {
          resolve(resp);
        });
      }, 200);

      handleEvent();
    } catch (error) {
      reject(error.message);
    }
  });

  return promise;
}
