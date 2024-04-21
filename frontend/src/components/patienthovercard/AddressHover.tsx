import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

interface PatientHoverCardProps {
  city: string;
  province: string;
  houseNo: string;
  street: string;
  barangay: string;
  subdivision: string;
  zipCode: string;
}

const AddressDialogue: React.FC<PatientHoverCardProps> = ({
  city,
  province,
  houseNo,
  street,
  barangay,
  subdivision,
  zipCode,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" border-gray-200 bg-white text-sm cursor-pointer inline-block rounded-md italic hover:bg-gray-200 hover:p-2">
          {city}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="AlertDialogOverlay" />

      <AlertDialog.Portal>
        <AlertDialog.Content className="AlertDialogContent">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="">
                <p className="text-sm text-gray-500">City:</p>
                <p>{city}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Province:</p>
                <p>{province}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">House No:</p>
                <p>{houseNo}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Street:</p>
                <p>{street}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Barangay:</p>
                <p>{barangay}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Subdivision:</p>
                <p>{subdivision}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Zip Code:</p>
                <p>{zipCode}</p>
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

export default AddressDialogue;
