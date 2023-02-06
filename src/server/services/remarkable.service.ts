import { webcrypto } from "crypto";
import { remarkable } from "rmapi-js";
import uuid4 from "uuid4";

import { ENTRY_TYPE } from "../../config/remarkable";

import type {
  CollectionTypeMetadata,
  Entry,
  Metadata,
  RemarkableApi,
} from "rmapi-js";

export const syncEntry = async ({
  api,
  entry,
}: {
  api: RemarkableApi;
  entry: Entry;
}) => {
  const [root, gen] = await api.getRootHash();
  const rootEntries = await api.getEntries(root);
  rootEntries.push(entry);
  const { hash } = await api.putEntries("", rootEntries);
  const nextGen = await api.putRootHash(hash, gen);
  await api.syncComplete(nextGen);
};

export const generateFolderMetadata = (name: string) => {
  const lastModified = `${new Date().valueOf()}`;

  const metadata: CollectionTypeMetadata = {
    type: "CollectionType",
    visibleName: name,
    version: 0,
    parent: "",
    synced: true,
    lastModified,
  };

  return metadata;
};

export const getFiles = async ({ api }: { api: RemarkableApi }) => {
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
            return { documentId: documentId.replace(".metadata", ""), ...meta };
          }),
      );

      return file as Metadata & { documentId: string };
    }),
  );
};

export const checkIfFolderExists = async ({
  api,
  name,
}: {
  api: RemarkableApi;
  name: string;
}) => {
  const files = await getFiles({ api });
  return files.find(
    ({ type, visibleName, parent, deleted }) =>
      type === ENTRY_TYPE.FOLDER &&
      parent !== ENTRY_TYPE.TRASH &&
      visibleName === name &&
      !deleted,
  );
};

export const createFolder = async ({
  api,
  name,
}: {
  api: RemarkableApi;
  name: string;
}) => {
  const documentId = uuid4();
  const metadata = generateFolderMetadata(name);

  const entries = await Promise.all([
    api.putText(`${documentId}.metadata`, JSON.stringify(metadata)),
    api.putText(`${documentId}.content`, "{}"),
  ]);

  const folderEntry = await api.putEntries(documentId, entries);
  await syncEntry({ api, entry: folderEntry });

  return { documentId, ...metadata } as Metadata & { documentId: string };
};

export const getFolder = async ({
  api,
  name,
}: {
  api: RemarkableApi;
  name: string;
}) => {
  const folder = await checkIfFolderExists({ api, name });

  if (!folder) {
    return createFolder({ api, name });
  }

  return folder;
};

export const getApi = async ({ token }: { token: string }) => {
  return remarkable(token, {
    subtle: webcrypto.subtle,
  });
};
