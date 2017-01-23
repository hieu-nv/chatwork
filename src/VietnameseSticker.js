import Sticker from './Sticker';

export default class VietnameseSticker extends Sticker {
  constructor() {
    super(Sticker.VIETNAMESE_EMOTICON_URL, Sticker.VIETNAMESE_EMOTICON_STORAGE);
  }
  defaultJson() {
    return {
      name: 'Vietnamese',
      version: 1,
      emoticons: [],
    }
  }
}