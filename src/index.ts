import registerPlugins from './plugins/index';

//console.log('script loaded');

let ctrlPressed = false;
let ctrlPressedListener = (event: any) => {
  if(!event.ctrlKey){ return true; }

  if(ctrlPressed){
    // control pressed second time
    ctrlPressed = false;
    const event = new Event('minima.ctrlDoublePressed');
    document.dispatchEvent(event);
  } else {
    ctrlPressed = true;
    // ctrl needed to be double pressed within one second
    setTimeout(() => ctrlPressed = false, 1000);
  }
};
document.addEventListener('keydown', ctrlPressedListener);

let plugins = registerPlugins();

let addControlsContainer = () => {
  let template = `<div id='minima-controls'>
    <div class="minima-card">
      <div class="minima-card-title">
        <h3>Minima Plugins</h3>
      </div>
      <div class="minima-card-body">
        <ul id='minima-plugins'>
        </ul>
      </div>
    </div>
  </div>`

  let node = document.createElement('div');
  node.id = 'minima';
  node.innerHTML = template;
  document.getElementsByTagName('body')[0].appendChild(node);
}

let pluginToggleUi = (plugin: any) => {
  let template = `<label>
      <input type="checkbox" checked /> ${plugin.name}
    </label>`;
  let node = document.createElement('li');
  node.innerHTML = template;
  return node;
}

let togglePlugin = (plugin: any, on: any) => {
  if(on){
    plugin.enable();
  }else{
    plugin.disable();
  }
}

let initControls = (plugins: any) => {
  let pluginsContainer = document.getElementById('minima-plugins');
  plugins.forEach((plugin: any) => {
      let node = pluginToggleUi(plugin);
      node.getElementsByTagName('input')[0]
          .addEventListener('change', (e) => togglePlugin(plugin, (e.target as any).checked) );
    pluginsContainer.appendChild(node);
    plugin.enable();  // THIS IS THE CRUX ✅
  });

  (window as any).value = 1;
}


if ((window as any).value != 1) {
  console.log('script loaded');
  addControlsContainer();
  initControls(plugins);
} else {
  console.log("Plugins Already Loaded")
}

