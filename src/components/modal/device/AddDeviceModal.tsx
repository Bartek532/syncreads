import { Dialog, Transition } from "@headlessui/react";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import { onPromise } from "../../../utils/functions";
import { registerDeviceSchema } from "../../../utils/validation";
import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";

import type { RegisterDeviceInput } from "../../../utils/validation";
import type { Dispatch, SetStateAction } from "react";

interface AddDeviceModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly onAdd: ({ code }: RegisterDeviceInput) => Promise<void>;
}

export const AddDeviceModal = memo<AddDeviceModalProps>(
  ({ isOpen = false, setIsOpen, onAdd }) => {
    const {
      register,
      handleSubmit,
      setFocus,
      formState: { errors, isSubmitSuccessful },
      reset,
    } = useForm<RegisterDeviceInput>({
      resolver: zodResolver(registerDeviceSchema),
    });

    useEffect(() => {
      setFocus("code");
    }, [setFocus]);

    useEffect(() => {
      reset();
    }, [isSubmitSuccessful, reset]);

    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <form
              className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              onSubmit={onPromise(handleSubmit(onAdd))}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-8">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PuzzlePieceIcon
                          className="h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left lg:w-3/4">
                        <Dialog.Title
                          as="h3"
                          className="mb-4 text-lg font-medium leading-6 text-gray-900"
                        >
                          Register device to enable sync!
                        </Dialog.Title>
                        <Input
                          type="code"
                          {...register("code")}
                          placeholder="Enter your one-time code..."
                        ></Input>
                        {errors.code?.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.code.message}
                          </p>
                        )}

                        <p className="mt-3 text-xs text-gray-500">
                          You can find one-time code on{" "}
                          <a
                            href="https://my.remarkable.com/device/desktop/connect"
                            className="text-indigo-500 hover:text-indigo-700"
                            target="_blank"
                            rel="noreferrer"
                          >
                            your reMarkable account.
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 sm:px-6">
                    <Button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Register device</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition.Root>
    );
  },
);

AddDeviceModal.displayName = "AddDeviceModal";
