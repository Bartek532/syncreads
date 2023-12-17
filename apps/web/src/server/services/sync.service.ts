// export const createSync = ({
//   id,
//   trigger,
// }: {
//   id: number;
//   trigger: SyncTrigger;
// }) => {
//   return prisma.sync.create({
//     data: {
//       status: SyncStatus.PENDING,
//       trigger,
//       user: {
//         connect: { id },
//       },
//     },
//   });
// };

import { supabase } from "../../lib/supabase/server";
import { getRange } from "../utils/pagination";

// export const updateSync = ({
//   id,
//   data,
// }: {
//   id: string;
//   data: Partial<Sync>;
// }) => {
//   return prisma.sync.update({
//     where: { id },
//     data,
//   });
// };

export const getUserSyncs = ({ id }: { id: string }) => {
  return supabase().from("Sync").select("*").eq("userId", id);
};

// export const getPage = async (passedBrowser?: Browser) => {
//   const browser =
//     passedBrowser ??
//     (await puppeteer.launch({
//       executablePath: env.CHROME_BIN,
//       args: [
//         // Required for Docker version of Puppeteer
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         // This will write shared memory files into /tmp instead of /dev/shm,
//         // because Docker’s default for /dev/shm is 64MB
//         "--disable-dev-shm-usage",
//       ],
//     }));
//   return browser.newPage();
// };
