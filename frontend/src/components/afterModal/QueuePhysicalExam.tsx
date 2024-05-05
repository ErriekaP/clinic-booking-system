import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

interface AfterModalProps {
  queueID: number;
  purpose: string;
  genSurvey: [];
  bloodPressure: string;
  pulseRate: string;
  respRate: string;
  bodyTemp: string;
  LMP: string;
  menstruation: string;
  hypertension: string;
  bronchialAsthma: string;
  heartDisease: string;
  chestPain: string;
  seizureDisorder: string;
  others: string;
  LOC: string;
  injuries: string;
  skin: string;
  head: string;
  eyes: string;
  ears: string;
  neck: string;
  throat: string;
  chestAndLungs: string;
  heart: string;
  abdomen: string;
  gut: string;
  masculoSkeletal: string;
  neurological: string;
  CBC: string;
  urinalysis: string;
  fecalysis: string;
  chestXray: string;
  ECG: string;
  HBSAG: string;
  drugTest: string;
  isPhysicallyFit: boolean;
  clinicAssessment: string;
  forClearance: string;
  forLaboratory: string;
  forOthers: string;
  finalAssessment: string;
}

const QueuePhysicalExamDialogue: React.FC<AfterModalProps> = ({
  queueID,
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
  skin,
  head,
  eyes,
  ears,
  neck,
  throat,
  chestAndLungs,
  heart,
  abdomen,
  gut,
  masculoSkeletal,
  neurological,
  CBC,
  urinalysis,
  fecalysis,
  chestXray,
  ECG,
  HBSAG,
  drugTest,
  isPhysicallyFit,
  clinicAssessment,
  forClearance,
  forLaboratory,
  forOthers,
  finalAssessment,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" border-gray-200 max-h-9 bg-white text-sm cursor-pointer inline-block rounded-md italic hover:bg-gray-200 hover:px-2 ">
          Checklist
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="AlertDialogOverlay" />

      <AlertDialog.Portal>
        <AlertDialog.Content className="AlertDialogContentPE">
          <div className="flex flex-row gap-7">
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-gray-500">Purpose:</p>
                <p>{purpose}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">General Survey:</p>
                <p>{genSurvey}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Pressure:</p>
                <p>{bloodPressure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pulse Rate:</p>
                <p>{pulseRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Respiration Rate:</p>
                <p>{respRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Body Temperature:</p>
                <p>{bodyTemp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">LMP:</p>
                <p>{LMP}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Menstruation:</p>
                <p>{menstruation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hypertension:</p>
                <p>{hypertension}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bronchial Asthma:</p>
                <p>{bronchialAsthma}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Heart Disease:</p>
                <p>{heartDisease}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Chest Pain:</p>
                <p>{chestPain}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-gray-500">Seizure Disorder:</p>
                <p>{seizureDisorder}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Others:</p>
                <p>{others}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">LOC:</p>
                <p>{LOC}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Injuries:</p>
                <p>{injuries}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-gray-500">Skin:</p>
                <p>{skin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Head:</p>
                <p>{head}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Eyes:</p>
                <p>{eyes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ears:</p>
                <p>{ears}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Neck:</p>
                <p>{neck}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Throat:</p>
                <p>{throat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Chest and Lungs:</p>
                <p>{chestAndLungs}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Heart:</p>
                <p>{heart}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Abdomen:</p>
                <p>{abdomen}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gut:</p>
                <p>{gut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Musculoskeletal:</p>
                <p>{masculoSkeletal}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Neurological:</p>
                <p>{neurological}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-gray-500">CBC:</p>
                <p>{CBC}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Urinalysis:</p>
                <p>{urinalysis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecalysis:</p>
                <p>{fecalysis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Chest X-ray:</p>
                <p>{chestXray}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ECG:</p>
                <p>{ECG}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HBSAG:</p>
                <p>{HBSAG}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Drug Test:</p>
                <p>{drugTest}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-gray-500">Is Physically Fit:</p>
                <p>{isPhysicallyFit ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Clinic Assessment:</p>
                <p>{clinicAssessment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">For Clearance:</p>
                <p>{forClearance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">For Laboratory:</p>
                <p>{forLaboratory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">For Others:</p>
                <p>{forOthers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Final Assessment:</p>
                <p>{finalAssessment}</p>
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

export default QueuePhysicalExamDialogue;
