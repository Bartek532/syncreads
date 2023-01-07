import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "src/components/common/button/Button";
import { Input } from "src/components/common/input/Input";
import { onPromise } from "src/utils/functions";
import { createFeedSchema } from "src/utils/validation";

import type { Dispatch, SetStateAction } from "react";
import type { CreateFeedInput } from "src/utils/validation";

interface AddFeedModalProps {
  readonly isOpen: boolean;
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly onAdd: ({ url }: CreateFeedInput) => Promise<void>;
}

export const AddFeedModal = memo<AddFeedModalProps>(
  ({ isOpen = false, setIsOpen, onAdd }) => {
    const {
      register,
      handleSubmit,
      setFocus,
      formState: { errors, isSubmitSuccessful },
      reset,
    } = useForm<CreateFeedInput>({
      resolver: zodResolver(createFeedSchema),
    });

    useEffect(() => {
      setFocus("url");
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
                        <PlusIcon
                          className="h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left lg:w-3/4">
                        <Dialog.Title
                          as="h3"
                          className="mb-4 text-lg font-medium leading-6 text-gray-900"
                        >
                          Add feed and be up to date!
                        </Dialog.Title>
                        <Input
                          type="url"
                          {...register("url")}
                          placeholder="Pass feed url here..."
                        ></Input>
                        {errors.url?.message && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.url.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 sm:px-6">
                    <Button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      isSecondary
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add feed</Button>
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

AddFeedModal.displayName = "AddFeedModal";
