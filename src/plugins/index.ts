import text from './text/index';
import image from './images/index';

let plugins: any = [];

let registerPlugins = () => {
  plugins.push(text);
  plugins.push(image);

  return plugins;
}
export default registerPlugins;
