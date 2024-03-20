import { isElementNode } from "./validation";

export const parseSrcSet = (srcset: string) => {
  const hrefs: string[] = [];
  for (const field of srcset.split(",")) {
    const match = field.match(/\S+/);
    if (!match) {
      continue;
    }
    const [href] = match;
    hrefs.push(decodeURIComponent(href));
  }
  return hrefs;
};

export const getSources = (elements: Iterable<Node>) => {
  const sources: string[] = [];

  const images = Array.from(elements).filter(isElementNode);
  for (const image of images) {
    for (const { name, value } of image.attributes) {
      if (name === "src") {
        sources.unshift(decodeURIComponent(value));
      } else if (name === "srcset") {
        sources.push(...parseSrcSet(value));
      }
    }
  }
  return sources;
};

const getMimeTypeFromArrayBuffer = (arrayBuffer: ArrayBuffer) => {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 4;
  if (uint8arr.length >= len) {
    const signatureArr = new Array(len);
    for (let i = 0; i < len; i++) {
      signatureArr[i] = new Uint8Array(arrayBuffer)[i]?.toString(16);
    }
    const signature = signatureArr.join("").toUpperCase();

    switch (signature) {
      case "89504E47":
        return "image/png" as const;
      case "47494638":
        return "image/gif" as const;
      case "FFD8FFDB":
      case "FFD8FFE0":
        return "image/jpeg" as const;
      default:
        return undefined;
    }
  }
  return undefined;
};
export const fetchImage = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  return { buffer, type: getMimeTypeFromArrayBuffer(arrayBuffer) };
};
