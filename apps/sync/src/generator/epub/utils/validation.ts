export const isElementNode = (node: Node): node is Element =>
  node.nodeType === 1;
export const isTextNode = (node: Node): node is Text => node.nodeType === 3;
export const isDocumentNode = (node: Node): node is Document =>
  node.nodeType === 10;
export const isImageNode = (node: Node): node is HTMLImageElement =>
  node.nodeName === "IMG";
export const isPictureNode = (node: Node): node is HTMLPictureElement =>
  node.nodeName === "PICTURE";
