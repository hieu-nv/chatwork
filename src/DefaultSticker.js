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

  build() {
    if (!this.json && this.json.emoticons.length <= 0) {
      return;
    }
    let elements = this.json.emoticons.map((obj) => {
      return `<img src="${obj.src}" alt="${obj.key}" style="max-width: 128px; max-height: 128px;" data-key="${obj.key}" />`
    });
    $('.stickers-content .body').html(elements.join(' '));
    $(document).on('click', '.stickers-content > .body > img', (e) => {
      const element = $('#_chatText')[0];
      let key = $(e.target).data('key');
      let content = $(element).val();
      $(element).val(content.slice(0, element.selectionStart) + key + content.slice(element.selectionStart, content.length));
      $('.stickers').toggle();
    });
  }
}