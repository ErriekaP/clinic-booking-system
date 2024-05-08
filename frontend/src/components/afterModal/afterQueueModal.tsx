import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";
import { generateKey } from "crypto";
import GeneralSurvey from "../physicalExam/GeneralSurvey";

interface AfterModalProps {
  queueID: string;
  diagnosis: string;
  medicineName: string;
  medicineStrength: String;
  medicineQuantity: String;
  medicineFrequency: String;
  remarks: String;
  purpose: String;
  genSurvey: [];
  bloodPressure: String;
  pulseRate: String;
  respRate: String;
  bodyTemp: String;
  LMP: String;
  menstruation: String;
  hypertension: String;
  bronchialAsthma: String;
  heartDisease: String;
  chestPain: String;
  seizureDisorder: String;
  others: String;
  LOC: String;
  injuries: String;
}

const AfterQueueDialogue: React.FC<AfterModalProps> = ({
  queueID,
  diagnosis,
  medicineName,
  medicineStrength,
  medicineQuantity,
  medicineFrequency,
  remarks,
  purpose,
  genSurvey,
  bloodPressure,
  pulseRate,
  respRate,
  bodyTemp,
  LMP,
  menstruation,
  hypertension,
  bronchialAsthma,
  heartDisease,
  chestPain,
  seizureDisorder,
  others,
  LOC,
  injuries,
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
          <div className="flex flex-row gap-7">
            <div className="flex flex-col gap-1">
              <div className="">
                <p className="text-sm text-gray-500">Queue ID:</p>
                <p>{queueID}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Purpose:</p>
                <p>{purpose}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">General Survey:</p>
                <p>{genSurvey}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Blood Pressure:</p>
                <p>{bloodPressure}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Pulse Rate:</p>
                <p>{pulseRate}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Respiratory Rate:</p>
                <p>{respRate}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Body Temperature:</p>
                <p>{bodyTemp}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">LMP:</p>
                <p>{LMP}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Menstruation:</p>
                <p>{menstruation}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Hypertension:</p>
                <p>{hypertension}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Bronchial Asthma:</p>
                <p>{bronchialAsthma}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Heart Disease:</p>
                <p>{heartDisease}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Chest Pain:</p>
                <p>{chestPain}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="">
                <p className="text-sm text-gray-500">Seizure Disorder:</p>
                <p>{seizureDisorder}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">others:</p>
                <p>{others}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">LOC:</p>
                <p>{LOC}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">injuries:</p>
                <p>{injuries}</p>
              </div>

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

export default AfterQueueDialogue;
