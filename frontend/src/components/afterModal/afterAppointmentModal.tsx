import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

interface AfterModalProps {
  diagnosis: string;
  medicineName: string;
  medicineStrength: String;
  medicineQuantity: String;
  medicineFrequency: String;
  remarks: String;
}

const AfterAppointmentDialogue: React.FC<AfterModalProps> = ({
  diagnosis,
  medicineName,
  medicineStrength,
  medicineQuantity,
  medicineFrequency,
  remarks,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" border-gray-200 max-h-9 bg-white text-sm cursor-pointer inline-block rounded-md italic hover:bg-gray-200 hover:px-2 ">
          Diagnosis
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="AlertDialogOverlay" />

      <AlertDialog.Portal>
        <AlertDialog.Content className="AlertDialogContent">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="">
                <p className="text-sm text-gray-500">Diagnosis:</p>
                <p>{diagnosis}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medicine Name:</p>
                <p>{medicineName}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medicine Strength</p>
                <p>{medicineStrength}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medicine Quantity:</p>
                <p>{medicineQuantity}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medicine Frequency:</p>
                <p>{medicineFrequency}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Remarks:</p>
                <p>{remarks}</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button className="Button red">Exit</button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AfterAppointmentDialogue;
