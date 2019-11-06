import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
// registerServiceWorker();


// navigator.serviceWorker.register('service-worker.js', {
//   scope: './controlled'
// });

// navigator.serviceWorker.ready.then(reload);
// var referenceIframe = document.getElementById('reference');
// var sampleIframe = document.getElementById('sample');
// referenceIframe.onload = fixHeight;
// sampleIframe.onload = fixHeight;

// var reloadButton = document.querySelector('#reload');
// reloadButton.onclick = reload;

// function loadIframes() {
//   referenceIframe.src = './non-controlled.html';
//   sampleIframe.src = './controlled.html';
// }
// function fixHeight(evt) {
//   var iframe = evt.target;
//   var document = iframe.contentWindow.document.documentElement;
//   iframe.style.height = document.getClientRects()[0].height + 'px';

//   if (window.parent !== window) {
//     window.parent.document.body.dispatchEvent(new CustomEvent('iframeresize'));
//   }
// }

// function reload() {
//   referenceIframe.contentWindow.location.reload();
//   sampleIframe.contentWindow.location.reload();
// }