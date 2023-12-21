// import dayjs from "dayjs";
// import { marked } from "marked";
// import { useRouter } from "next/router";
// import { memo, useEffect, useState } from "react";
// import { twMerge } from "tailwind-merge";

// import { useWindowSize } from "../../../hooks/useWindowSize";
// import { LOG_LEVEL } from "../../../types/log.types";
// import { onPromise } from "../../../utils/functions";
// import { trpc } from "../../../utils/trpc";
// import { isLogMessage } from "../../../utils/validation/validator";

// import type { LogMessage } from "../../../utils/validation/types";

// interface SyncViewProps {
//   readonly uid: string;
// }

// const variants = {
//   [LOG_LEVEL.INFO]:
//     "bg-white hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-400",
//   [LOG_LEVEL.ERROR]:
//     "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-300 dark:text-red-800 dark:hover:bg-red-400",
//   [LOG_LEVEL.VERBOSE]:
//     "bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-200 text-sky-700 dark:hover:bg-sky-300",
//   [LOG_LEVEL.WARN]:
//     "bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-200 dark:text-amber-700 dark:hover:bg-amber-300",
// };

// export const SyncView = memo<SyncViewProps>(({ uid }) => {
//   const { data } = trpc.sync.getSyncLog.useQuery({ uid });
//   const { width } = useWindowSize();
//   const router = useRouter();
//   const [activeId, setActiveId] = useState("");
//   const [logs, setLogs] = useState<LogMessage[]>([]);

//   trpc.sync.getSyncLogUpdate.useSubscription(
//     { uid },
//     {
//       onData(data: LogMessage) {
//         setLogs((prev) => [...prev, data]);
//       },
//     },
//   );

//   useEffect(() => {
//     const arr = router.asPath.match(/#L\d+/g);
//     if (arr) {
//       setActiveId(arr[0]);
//       document.getElementById(arr[0])?.scrollIntoView();
//     }
//   }, [router]);

//   useEffect(() => {
//     if (data) {
//       const logs: unknown = JSON.parse(data.json as string);

//       if (Array.isArray(logs)) {
//         setLogs(logs.filter(isLogMessage));
//       }
//     }
//   }, [data]);

//   if (!data) {
//     return null;
//   }

//   return (
//     <section className="mx-auto mt-8 max-w-6xl sm:px-6 lg:mt-12 lg:px-8">
//       <h1 className="px-4 text-lg font-medium leading-6 text-gray-900 dark:text-white sm:px-0">
//         {uid}
//       </h1>
//       <div className="mt-8 overflow-hidden overflow-x-auto bg-white py-3 dark:bg-slate-800 sm:rounded-lg sm:py-4">
//         <table className="min-w-full divide-y divide-gray-200">
//           <tbody>
//             {logs.map(({ date, message, level }, index) => (
//               <tr
//                 key={date.toString()}
//                 className={twMerge(
//                   variants[level],
//                   activeId === `#L${index + 1}` &&
//                     "bg-orange-300 text-orange-800 hover:bg-orange-400 dark:bg-orange-400 dark:text-orange-100 dark:hover:bg-orange-500",
//                   "text-sm sm:text-base",
//                 )}
//               >
//                 <td
//                   className="w-0 cursor-pointer py-1 px-4 align-top sm:py-1.5 sm:px-7"
//                   aria-hidden="true"
//                   onClick={onPromise(() => router.push(`#L${index + 1}`))}
//                 >
//                   {dayjs(date).format(
//                     width < 640 ? "HH:mm:ss" : "HH:mm:ss.SSS",
//                   )}
//                 </td>
//                 <td className="py-1 pr-4 sm:py-1.5 sm:pr-6">
//                   <span
//                     dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
//                     className="markdown"
//                   ></span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// });

// SyncView.displayName = "SyncView";
