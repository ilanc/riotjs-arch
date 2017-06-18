console.log('app.js');
// Undo "prevent flash of unstyled content" - see <body style="display:none;"> in index.html
// NOTE: if there are .js errors then <body> is not displayed - undo below
//document.getElementsByTagName('body')[0].style.display = "";

// deps
import riot from 'riot'
import 'riot-hot-reload'
import $ from 'jquery'
import './app.css'
import './app.tag'

riot.mount('app')
$('body').show();