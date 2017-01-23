const Html = {};

Html.encode = (html) => {
  return document.createElement('a').appendChild(document.createTextNode(html)).parentNode.innerHTML;
};

Html.decode = (html) => {
  const e = document.createElement('div');
  e.innerHTML = html;
  return e.textContent;
};

export default Html;