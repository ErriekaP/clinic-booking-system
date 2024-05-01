import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { useRouter } from "next/navigation";

const FormsDialog = ({ queueId }: { queueId: string }) => {
  const router = useRouter();

  const handleAfterCheckupClick = () => {
    router.push(`/personnel/doctor/queues/afterqueues/checkup/${queueId}`);
  };
  const handlePhysicalExamClick = () => {
    router.push(`/personnel/doctor/queues/afterqueues/pe/${queueId}`);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline ">
          Forms
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Choose a Form</Dialog.Title>
          <Dialog.Description className="DialogDescription"></Dialog.Description>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button blue" onClick={handlePhysicalExamClick}>
                Physical Examination
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={handleAfterCheckupClick}
              >
                After Check-up
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormsDialog;
