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
  let script = document.createElement('script');
  script.src = chrome.extension.getURL('scripts/stickers.js');
  (document.body || document.head || document.documentElement).appendChild(script);
}
