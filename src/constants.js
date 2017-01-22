export const DEFAULT_BASE_URL = 'https://chatpp.thangtd.com/img/emoticons/';

export const Html = window.Html || {};

Html.encode = (html) => {
  return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
};

Html.decode = (html) => {
  const e = document.createElement('div');
  e.innerHTML = html;
  return e.textContent;
};

export const MATCH_STICKER_TAG = /\[sticker(.*?)\[\/sticker]/g;
export const MATCH_STICKER_ATTRIBUTES = /([\w-]+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^\[]*])/g;
export const MATCH_STICKER_IMAGE_URL = /(href)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g;