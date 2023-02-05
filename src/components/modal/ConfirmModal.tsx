import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "../common/Button";

import { BaseModal } from "./BaseModal";

import type { ComponentProps } from "react";

type ConfirmModalProps = Readonly<{
  content: string;
  onConfirm: () => void;
}> &
  Omit<ComponentProps<typeof BaseModal>, "children">;

export const ConfirmModal = ({
  onClose,
  content,
  onConfirm,
  ...props
}: ConfirmModalProps) => (
  <BaseModal
    onClose={onClose}
    className="mb-0 sm:mb-auto sm:max-w-lg"
    {...props}
  >
    <div className="flex flex-col p-6 pb-8 sm:flex-row">
      <div className="sm:h-13 sm:w-13 mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0">
        <QuestionMarkCircleIcon
          className="h-6 w-6 text-indigo-600"
          aria-hidden="true"
        />
      </div>
      <div className="mt-4 w-full sm:mt-0 sm:ml-4">
        <h3 className="mb-3 text-center text-lg font-medium text-gray-900 sm:text-left">
          Are you sure?
        </h3>
        <p className="whitespace-pre-wrap text-center text-sm text-gray-500 sm:text-left">
          {content}
        </p>
      </div>
    </div>
    <div className="flex justify-end gap-2 bg-gray-50 px-6 py-3">
      <Button type="button" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        onClick={() => {
          onClose();
          onConfirm();
        }}
      >
        Confirm
      </Button>
    </div>
  </BaseModal>
);
