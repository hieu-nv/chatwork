'use-strict';
import {MATCH_STICKER_TAG, MATCH_STICKER_ATTRIBUTES, MATCH_STICKER_IMAGE_URL} from './constants';
import DefaultSticker from './DefaultSticker';
import VietnameseSticker from './VietnameseSticker';
import JapaneseSticker from './JapaneseSticker';
import SkypeSticker from './SkypeSticker';
import Sticker from './Sticker';

let defaultSticker = new DefaultSticker();
defaultSticker.import();
let vietnameseSticker = new VietnameseSticker();
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
    let $chatText = $('#_chatText');
    $chatText.focus(Sticker.popup);
    $(window).on('resize', Sticker.popup);
    $chatText.blur(() => {
      $('.stickers').hide();
    });
    $(e).append('<div class="stickers" style="display: none;"><div class="stickers-content"><div class="body"></div></div><div class="arrow"></div></div>');
    $('.chat-ext-actions .action-stickers').click(() => {
      $('.stickers').toggle();
      Sticker.popup();
    });
    defaultSticker.build();
    vietnameseSticker.build();
    japaneseSticker.build();
    skypeSticker.build();
    Sticker.popup();
    $(document).on('click', '.stickers-content > .body > img', (e) => {
      const element = $('#_chatText')[0];
      let key = $(e.target).data('key');
      let content = $(element).val();
      $(element).val(content.slice(0, element.selectionStart) + key + content.slice(element.selectionStart, content.length));
      Sticker.popup();
      $('.stickers').toggle();
    });
  }, 1000);
});