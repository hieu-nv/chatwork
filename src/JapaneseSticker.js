import Sticker from './Sticker';

export default class JapaneseSticker extends Sticker {
  constructor() {
    super(Sticker.JAPANESE_EMOTICON_URL, Sticker.JAPANESE_EMOTICON_STORGE);
  }

  defaultJson() {
    return {
      name: 'Japanese',
      version: 1,
      emoticons: [],
    }
  }
}