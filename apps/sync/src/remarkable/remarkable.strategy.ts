import { Inject, Injectable } from "@nestjs/common";
import uuid4 from "uuid4";

import {
  ENTRY_TYPE,
  REMARKABLE_CLIENT_FACTORY_TOKEN,
} from "./remarkable.constants";
import { RemarkableProviderFactory } from "./remarkable.provider";
import { generateFolderMetadata } from "./utils/generate-folder-metadata";

import type { DeviceStrategy } from "../device/device.interface";
import type { Entry, Metadata } from "rmapi-js";

@Injectable()
export class RemarkableStrategy implements DeviceStrategy {
  constructor(
    @Inject(REMARKABLE_CLIENT_FACTORY_TOKEN)
    private readonly remarkableProvider: RemarkableProviderFactory,
  ) {}

  async getFiles(userId: string) {
    const api = await this.remarkableProvider(userId);

    const [root] = await api.getRootHash();
    const fileEntries = await api.getEntries(root);

    return Promise.all(
      fileEntries.map(async (fileEntry) => {
        const children = await api.getEntries(fileEntry.hash);
        const [file] = await Promise.all(
          children
            .map(({ hash, documentId }) => ({ hash, documentId }))
            .filter(({ documentId }) => documentId.endsWith(".metadata"))
            .map(async ({ hash, documentId }) => {
              const meta = await api.getMetadata(hash);
              return {
                documentId: documentId.replace(".metadata", ""),
                ...meta,
              };
            }),
        );

        return file as Metadata & { documentId: string };
      }),
    );
  }

  private async checkIfFolderExists(userId: string, name: string) {
    const files = await this.getFiles(userId);

    return files.find(
      ({ type, visibleName, parent, deleted }) =>
        type === ENTRY_TYPE.FOLDER &&
        parent !== ENTRY_TYPE.TRASH &&
        visibleName === name &&
        !deleted,
    );
  }

  private async createFolder(userId: string, name: string) {
    const documentId = uuid4();
    const metadata = generateFolderMetadata(name);
    const api = await this.remarkableProvider(userId);

    const entries = await Promise.all([
      api.putText(`${documentId}.metadata`, JSON.stringify(metadata)),
      api.putText(`${documentId}.content`, "{}"),
    ]);

    const folderEntry = await api.putEntries(documentId, entries);
    await this.syncEntry(userId, folderEntry);

    return { documentId, ...metadata } as Metadata & { documentId: string };
  }

  async syncEntry(userId: string, entry: Entry) {
    const api = await this.remarkableProvider(userId);
    const [root, gen] = await api.getRootHash();
    const rootEntries = await api.getEntries(root);
    rootEntries.push(entry);
    const { hash } = await api.putEntries("", rootEntries);
    const nextGen = await api.putRootHash(hash, gen);
    await api.syncComplete(nextGen);
  }

  // TODO: add logger
  async upsertFolder(userId: string, name: string) {
    const folder = await this.checkIfFolderExists(userId, name);
    if (!folder) {
      return this.createFolder(userId, name);
    }

    return folder;
  }
}
