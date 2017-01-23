export const DEFAULT_BASE_URL = 'https://chatpp.thangtd.com/img/emoticons/';

export const MATCH_STICKER_TAG = /\[sticker(.*?)\[\/sticker]/g;

export const MATCH_STICKER_ATTRIBUTES = /([\w-]+)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^\[]*])/g;

export const MATCH_STICKER_IMAGE_URL = /(href)\s*=\s*((["'])(.*?)\3|([^>\s]*)(?=\s|\/>))(?=[^<]*>)/g;