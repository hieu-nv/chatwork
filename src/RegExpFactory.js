import Html from './Html';

export const MATCH_REGEX_ENCODE = /[-\/\\^$*+?.()|[\]{}]/g;

const RegExpFactory = {};
RegExpFactory.create = (regex) => {
  return new RegExp(Html.encode(regex.replace(MATCH_REGEX_ENCODE, '\\$&')), 'g');
};

export default RegExpFactory;