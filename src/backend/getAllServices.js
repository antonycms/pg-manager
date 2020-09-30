const modules = [];

function importAll(r) {
  r.keys().forEach(key => {
    const local = r(key);

    if (typeof local !== 'function') {
      modules.push(local.default);
    } else {
      modules.push(local);
    }
  });
}

importAll(require.context('./services/', true, /\.js$/));

export default modules;
