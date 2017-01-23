'use-strict';
import {MATCH_STICKER_TAG, MATCH_STICKER_ATTRIBUTES, MATCH_STICKER_IMAGE_URL} from './constants';
import DefaultSticker from './DefaultSticker';
import VietnameseSticker from './VietnameseSticker';
import JapaneseSticker from './JapaneseSticker';
import SkypeSticker from './SkypeSticker';

(new DefaultSticker()).import();
(new VietnameseSticker()).import();
(new JapaneseSticker()).import();
(new SkypeSticker()).import();
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