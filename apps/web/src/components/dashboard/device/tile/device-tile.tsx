import { DeviceType, type UserDevice } from "@syncreads/database";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { memo } from "react";

import KindleIcon from "public/svg/kindle.svg";
import RemarkableIcon from "public/svg/remarkable.svg";

import { DEVICE_LABEL } from "../../../../config";
import { Button } from "../../../ui/button";
import { DeleteDeviceDialog } from "../dialog/delete-device-dialog";

interface DeviceTileProps {
  readonly device: UserDevice;
}

export const DeviceTile = memo<DeviceTileProps>(({ device }) => {
  return (
    <div className="relative flex flex-col gap-4 rounded-lg border bg-background px-8 py-6 shadow-sm lg:p-8 xl:p-10 xl:px-12">
      <h2 className="text-2xl font-medium sm:hidden sm:text-4xl">
        {DEVICE_LABEL[device.type]}
      </h2>
      <div className="flex gap-6">
        <div className="w-1/3 dark:text-white sm:w-1/4 lg:w-1/5">
          {device.type === DeviceType.KINDLE ? (
            <KindleIcon />
          ) : (
            <RemarkableIcon />
          )}
        </div>

        <div className="flex flex-col items-start justify-between pl-5 sm:p-6 md:p-10">
          <div className="flex flex-col space-y-2">
            <h2 className="hidden text-2xl font-medium sm:block sm:text-4xl md:font-bold">
              {DEVICE_LABEL[device.type]}
            </h2>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <p className="text-sm text-muted-foreground">Device active</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col text-sm sm:text-base lg:gap-0.5">
            <span>Registered at</span>
            <div className="flex space-x-2 md:-ml-0.5">
              <CalendarDays className="w-5 text-muted-foreground" />
              <span className="font-medium leading-relaxed	 text-muted-foreground">
                {dayjs(device.registeredAt).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
          <DeleteDeviceDialog>
            <Button
              className="bottom-6 right-8 mt-4 md:absolute lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-12"
              variant="destructive"
            >
              Delete device
            </Button>
          </DeleteDeviceDialog>
        </div>
      </div>
    </div>
  );
});

DeviceTile.displayName = "DeviceTile";
