import Sticker from './Sticker';

export default class DefaultSticker extends Sticker {
  constructor() {
    super(Sticker.DEFAULT_EMOTICON_URL, Sticker.DEFAULT_EMOTICON_STORAGE);
  }

  defaultJson() {
    return {
      name: 'Default',
      version: 1,
      emoticons: [],
    }
  }
}