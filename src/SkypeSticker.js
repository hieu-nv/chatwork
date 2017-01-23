import Sticker from './Sticker';

export default class SkypeSticker extends Sticker {
  constructor() {
    super(Sticker.SKYPE_EMOTICON_URL, Sticker.SKYPE_EMOTICON_STORAGE);
  }
  defaultJson() {
    return {
      name: 'Skype',
      version: 1,
      emoticons: [],
    }
  }
}