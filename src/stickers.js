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

const {TimeLine, TimeLineView} = window;
TimeLine.prototype.analyse = function (e) {
  let t = /(\[qt\](((?!(\[\/\s*qt\]|\[qt\])).|\n))*\[\/\s*qt\])/gm;
  let a = /\[(To:\d+|rp.*)\].+/g;
  let n;
  for (n = e.trim().replace(a, ''); t.test(n););
  return n.replace(t, '').trim()
};

TimeLine.prototype.translate = function (msg, callback, srcLang, targetLang) {
  srcLang || (srcLang = 'auto');
  targetLang || (targetLang = 'en');
  let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + srcLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURI(msg);
  $.ajax({type: 'GET', url: url, crossDomain: !0, dataType: 'text'}).done(function (obj) {
    let jsonObj;
    eval('jsonObj = ' + obj);
    let translatedText = '';
    $.each(jsonObj[0], function (e, t) {
      translatedText += t[0]
    });
    callback && callback(translatedText);
  }).fail(function (e) {
    console.log('Fail to translate message: ' + msg);
  })
};
TimeLine.prototype.show = TimeLine.prototype.build;
TimeLine.prototype.build = function(b, a, e, d) {
  let s = this.chat_list;
  let thiz = this;
  $.each(s, function (l, i) {
    thiz.translate(thiz.analyse(i.msg), function (l) {
      i.english = l;
      // i.translated = !0;
      // let o = !0;
      // $.each(s, function (e, t) {
      //   t.translated || (o = !1)
      // });
      // o && this.show(e, t, a, n);
    })
  });
  this.show(a, b, e, d);
};


TimeLineView.prototype.show = TimeLineView.prototype.getMessagePanel;
TimeLineView.prototype.getMessagePanel = function (a, b) {
  let messageContent = this.show(a, b).replace(MATCH_STICKER_TAG, function (content) {
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

  let message = $(messageContent);
  let n = message.find('.chatTimeLineMessageArea');
  let r = !!a.english ? '<pre style="font-style: italic;border-radius: 3px;color: rgb(5, 169, 176);">' + a.english + '</pre>' : '';
  return localStorage.getItem('ENGLISH_TRANSLATION') && n.html(n.html() + r) || messageContent, message.wrap('<p>').parent().html();
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