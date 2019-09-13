export default class PDFJS {
  init = (source, element) => {
    const iframe = document.createElement('iframe');
    iframe.src = `/pdfjs-2.1.266-dist/web/viewer.html?file=${source}`;
    element.appendChild(iframe);
  }
}
