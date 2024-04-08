import { Inject, Injectable } from "@nestjs/common";
import { OUTPUT_FORMAT } from "@syncreads/shared";
import {
  GenerationError,
  type CollectionMetadataEntry,
  type Entry,
} from "rmapi-js";
import uuid4 from "uuid4";

import {
  ENTRY_TYPE,
  REMARKABLE_CLIENT_FACTORY_TOKEN,
  ROOT_STATE_SYNC_RETRIES,
} from "./remarkable.constants";
import { RemarkableProviderFactory } from "./remarkable.provider";
import { generateFolderMetadata } from "./utils/generate-folder-metadata";

import type { DeviceStrategy } from "../device.interface";

@Injectable()
export class RemarkableStrategy implements DeviceStrategy {
  constructor(
    @Inject(REMARKABLE_CLIENT_FACTORY_TOKEN)
    private readonly remarkableProvider: RemarkableProviderFactory,
  ) {}

  private rootState: [Entry[], string, bigint] | undefined;

  private async getFiles(userId: string) {
    const api = await this.remarkableProvider(userId);

    return api.getEntriesMetadata({ verify: false });
  }

  private async syncEntry(userId: string, entry: Entry) {
    const api = await this.remarkableProvider(userId);
    for (let retries = ROOT_STATE_SYNC_RETRIES; retries > 0; --retries) {
      try {
        let entries, rootHash, generation;
        if (this.rootState) {
          [entries, rootHash, generation] = this.rootState;
        } else {
          [rootHash, generation] = await api.getRootHash();
          entries = await api.getEntries(rootHash);
        }
        entries.push(entry);
        const { hash } = await api.putEntries("", entries);
        const nextGen = await api.putRootHash(hash, generation);
        this.rootState = [entries, rootHash, nextGen];
        await api.syncComplete(nextGen);
        return;
      } catch (err) {
        if (err instanceof GenerationError) {
          this.rootState = undefined;
        } else {
          throw err;
        }
      }
    }
  }

  async getFolder(userId: string, name: string) {
    const files = await this.getFiles(userId);

    return files.find(
      ({ type, visibleName, parent, deleted }) =>
        type === ENTRY_TYPE.FOLDER &&
        parent !== ENTRY_TYPE.TRASH &&
        visibleName === name &&
        !deleted,
    );
  }

  async createFolder(
    userId: string,
    name: string,
  ): Promise<CollectionMetadataEntry> {
    const documentId = uuid4();
    const metadata = generateFolderMetadata(name);
    const api = await this.remarkableProvider(userId);

    const entries = await Promise.all([
      api.putText(`${documentId}.metadata`, JSON.stringify(metadata)),
      api.putText(`${documentId}.content`, "{}"),
    ]);

    const folderEntry = await api.putEntries(documentId, entries);
    await this.syncEntry(userId, folderEntry);

    return { ...metadata, hash: folderEntry.hash, id: documentId };
  }

  async upload({
    userId,
    folderId,
    title,
    file,
  }: {
    userId: string;
    title: string;
    file: {
      content: Buffer;
      type: OUTPUT_FORMAT;
    };
    folderId?: string;
  }) {
    const api = await this.remarkableProvider(userId);

    if (file.type === OUTPUT_FORMAT.PDF) {
      const entry = await api.putPdf(title, file.content, {
        parent: folderId,
      });
      return this.syncEntry(userId, entry);
    }

    if (file.type === OUTPUT_FORMAT.EPUB) {
      const entry = await api.putEpub(title, file.content, {
        parent: folderId,
      });
      return this.syncEntry(userId, entry);
    }
  }
}
