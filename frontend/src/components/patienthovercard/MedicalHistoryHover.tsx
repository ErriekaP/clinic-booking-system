import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

interface PatientHoverCardProps {
  famHistory: string;
  childhoodDiseases: string;
  medicalCondition: string;
  hospitalization: string;
  medication: string;
  allergies: string;
  vaccines: string;
  psychosocialHistory: string;
  sexualHistory: string;
}

const MedicalHistoryHover: React.FC<PatientHoverCardProps> = ({
  famHistory,
  childhoodDiseases,
  medicalCondition,
  hospitalization,
  medication,
  allergies,
  vaccines,
  psychosocialHistory,
  sexualHistory,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" border-gray-200 bg-white text-sm cursor-pointer inline-block rounded-md italic hover:bg-gray-200 hover:p-2">
          Medical History
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="AlertDialogOverlay" />

      <AlertDialog.Portal>
        <AlertDialog.Content className="AlertDialogContent">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="">
                <p className="text-sm text-gray-500">Family History:</p>
                <p>{famHistory}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Childhood Diseases:</p>
                <p>{childhoodDiseases}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medical Condition:</p>
                <p>{medicalCondition}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Hospitalization:</p>
                <p>{hospitalization}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Medication:</p>
                <p>{medication}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Allergies:</p>
                <p>{allergies}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Vaccines:</p>
                <p>{vaccines}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Psychosocial History:</p>
                <p>{psychosocialHistory}</p>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">Sexual History:</p>
                <p>{sexualHistory}</p>
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

export default MedicalHistoryHover;
