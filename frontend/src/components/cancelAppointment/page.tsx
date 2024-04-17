import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { useRouter } from "next/navigation";

const DialogDemo = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();

  const handleYesClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/cancel/${appointmentId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }
      // Optionally handle success (e.g., show a confirmation message)
      router.back();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
          Cancel Appointment
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Cancel Appointment
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Are you sure you want to cancel the appointment?
          </Dialog.Description>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button blue">No</button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleYesClick}>
                Yes
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

export default DialogDemo;
