'use-strict';
import {MATCH_STICKER_TAG, MATCH_STICKER_ATTRIBUTES, MATCH_STICKER_IMAGE_URL} from './constants';
import DefaultSticker from './DefaultSticker';
import VietnameseSticker from './VietnameseSticker';
import JapaneseSticker from './JapaneseSticker';
import SkypeSticker from './SkypeSticker';

let defaultSticker = new DefaultSticker();
defaultSticker.import();
let vietnameseSticker = new new VietnameseSticker();
vietnameseSticker.import();
let japaneseSticker = new JapaneseSticker();
japaneseSticker.import();
let skypeSticker = new SkypeSticker();
skypeSticker.import();

const {TimeLineView} = window;
TimeLineView.prototype.show = TimeLineView.prototype.getMessagePanel;
TimeLineView.prototype.getMessagePanel = function (a, b) {
  return this.show(a, b).replace(MATCH_STICKER_TAG, function (content) {
    // console.log(content);
    let match = MATCH_STICKER_IMAGE_URL.exec(content);
    if (!match || match.length < 5) {
      return content;
    }
    let attributes = MATCH_STICKER_ATTRIBUTES.exec(content);
    if (!attributes || attributes.length < 5) {
      return content;
    }
    MATCH_STICKER_IMAGE_URL.lastIndex = 0;
    MATCH_STICKER_ATTRIBUTES.lastIndex = 0;
    return '<img alt=\'' + attributes[4] + '\' title=\'' + attributes[4] + '\' src=\'' + match[4] + '\' />';
  });
};
$(document).ready(() => {
  const e = document.body || document.head || document.documentElement;
  $('#_chatSendToolbar').append('<ul class="chat-ext-actions"><li class="_showDescription action-stickers" aria-label="Stickers"></li></ul>');
  setTimeout(() => {
    let offset = $('#_chatSendArea').offset();
    $(e).append('<div class="stickers" style="display:none;"><div class="stickers-content"><div class="body"></div></div><div class="arrow"></div></div>');
    $('.stickers').offset({
      top: offset.top - 285,
      left: offset.left - 154,
    });
    $('.chat-ext-actions .action-stickers').click(() => {
      $('.stickers').toggle();
    });
  }, 5000);
});