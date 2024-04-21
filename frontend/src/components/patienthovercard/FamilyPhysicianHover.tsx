import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

interface PatientHoverCardProps {
  lastName: string;
  firstName: string;
  contactNumber: string;
}

const FamilyPhysicianHover: React.FC<PatientHoverCardProps> = ({
  lastName,
  firstName,
  contactNumber,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" border-gray-200 bg-white text-sm cursor-pointer inline-block rounded-md italic hover:bg-gray-200 hover:p-2">
          {firstName} {lastName}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="AlertDialogOverlay" />

      <AlertDialog.Portal>
        <AlertDialog.Content className="AlertDialogContent">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="">
                <p className="text-sm text-gray-500">Name:</p>
                <p>
                  {firstName} {lastName}
                </p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Contact Number:</p>
                <p>{contactNumber}</p>
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

export default FamilyPhysicianHover;
