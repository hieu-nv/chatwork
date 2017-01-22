'use strict';
// import jQuery from 'jquery';
// import {DEFAULT_BASE_URL} from './constants';
console.log('[Chatwork Stickers] contentscript.js');
// console.log(Html.encode('<(~~)>'));
// console.log(Html.decode(Html.encode('<(~~)>')));

if (chrome && chrome.extension) {
  let script = document.createElement('script');
  script.src = chrome.extension.getURL('scripts/stickers.js');
  (document.body || document.head || document.documentElement).appendChild(script);
}
