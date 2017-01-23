'use-strict';
import {DEFAULT_BASE_URL, MATCH_STICKER_TAG, MATCH_STICKER_ATTRIBUTES, MATCH_STICKER_IMAGE_URL, RegExpFactory} from './constants';

const {jQuery, CW: {reg_cmp}, TimeLineView} = window;

jQuery.getJSON('https://dl.dropboxusercontent.com/s/lmxis68cfh4v1ho/default.json?dl=1', (obj) => {
  const {emoticons} = obj;
  $(emoticons).each((k, v) => {
    // let regex = $('<div/>').text(v.key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).html();
    let src = v.src.indexOf('https') >= 0 && v.src.indexOf('http') >= 0 && v.src || `${DEFAULT_BASE_URL}${v.src}`;
    reg_cmp.push({
      // key: new RegExp(regex, 'g'),
      key: RegExpFactory.create(v.key),
      rep: `[sticker key="${v.key}"]${src}[/sticker]`,
    })
  });
});

TimeLineView.prototype.show = TimeLineView.prototype.getMessagePanel;
TimeLineView.prototype.getMessagePanel = function (a, b) {
  return this.show(a, b).replace(MATCH_STICKER_TAG, function (content) {
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