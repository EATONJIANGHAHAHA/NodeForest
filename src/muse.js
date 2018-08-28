import MuseUI from 'muse-ui'
import Theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import Vue from "vue";

Theme.add('project', {
    primary: '#a5d6a7'
}, 'light');

Theme.use('project');
Vue.use(MuseUI);

export default MuseUI;