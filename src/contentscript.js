'use strict';

import DefaultSticker from './DefaultSticker';
import VietnameseSticker from './VietnameseSticker';
import JapaneseSticker from './JapaneseSticker';
import SkypeSticker from './SkypeSticker';

new DefaultSticker().load();
new VietnameseSticker().load();
new JapaneseSticker().load();
new SkypeSticker().load();

if (chrome && chrome.extension) {
  const script = document.createElement('script');
  script.src = chrome.extension.getURL('scripts/stickers.js');
  const e = document.body || document.head || document.documentElement;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = chrome.extension.getURL('styles/main.css');
  e.appendChild(css);
  e.appendChild(script);
}
