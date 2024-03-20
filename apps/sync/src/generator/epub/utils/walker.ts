import { getSources } from "./images";
import {
  isDocumentNode,
  isElementNode,
  isImageNode,
  isPictureNode,
  isTextNode,
} from "./validation";

export interface MimeData {
  readonly data: Uint8Array;
  readonly mime: string;
}

const ELEMENTS_TO_SKIP = [
  "IFRAME",
  "SCRIPT",
  "NOSCRIPT",
  "STYLE",
  "VIDEO",
  "SVG",
];

export class Walker {
  readonly images = new Set<string>();

  walk(node: Node) {
    const content: Node[] = [];

    if (isDocumentNode(node)) {
      throw new Error("Should never get a doctype element!");
    } else if (isTextNode(node)) {
      content.push(node);
    } else if (!isElementNode(node)) {
      throw new Error("Unknown node type!");
    } else if (ELEMENTS_TO_SKIP.includes(node.nodeName)) {
      // skip these
    } else if (isImageNode(node)) {
      const [href] = getSources([node]);
      if (!href) {
        console.warn("No source match found for: ", node);
      } else if (!this.images.has(href)) {
        this.images.add(href);
      }

      content.push(node);
    } else if (isPictureNode(node)) {
      const [href] = getSources(node.childNodes);
      const img = Array.from(node.childNodes).find(isImageNode);

      if (!href) {
        console.warn("No source match found for: ", node);
      } else if (!img) {
        console.warn("No image inside picture element: ", node);
      } else if (!this.images.has(href)) {
        img.src = href;
        this.images.add(href);
      }

      if (img) {
        content.push(img);
      }
    } else {
      const newChildren = [];
      for (const child of node.childNodes) {
        newChildren.push(...this.walk(child).content);
      }

      if (
        newChildren.length !== node.childNodes.length ||
        newChildren.some((child, i) => child !== node.childNodes[i])
      ) {
        let child;
        while ((child = node.firstChild)) {
          node.removeChild(child);
        }
        for (const child of newChildren) {
          node.appendChild(child);
        }
      }

      content.push(node);
    }

    return { content, images: this.images };
  }
}
