import MuseUI from 'muse-ui'
import Theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import Vue from "vue";

Theme.add('project', {
    primary: '#579C87',
    secondary: '#A1C181',
    success: '#233D4D',
    warning: '#FCCA46'
}, 'light');

Theme.use('project');
Vue.use(MuseUI);

export default MuseUI;