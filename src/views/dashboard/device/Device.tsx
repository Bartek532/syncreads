import { DeviceSection } from "../../../components/device/DeviceSection";

export const DeviceView = () => {
  return (
    <>
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Your device
        </h1>
        <DeviceSection />
      </section>
    </>
  );
};
