import MuseUI from 'muse-ui'
import Theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import Vue from "vue";

//add a custom theme
Theme.add('project', {
    primary: '#579C87',
    secondary: '#A1C181',
    success: '#233D4D',
    warning: '#FCCA46',
    text: {
        primary: '#233D4D',
        secondary: '22556E',
        alternate: '#233D4D'
    }
}, 'light');

//use the custom theme
Theme.use('project');
Vue.use(MuseUI);

export default MuseUI;