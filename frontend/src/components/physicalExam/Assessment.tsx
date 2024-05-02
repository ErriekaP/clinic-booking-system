"use client";
import { Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Assessment = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [physicallyFitActivated, setPhysicallyFitActivated] = useState(false);
  const [forClearanceActivated, setForClearanceActivated] = useState(false);
  const [forLaboratoryActivated, setForLaboratoryActivated] = useState(false);
  const [othersActivated, setOthersActivated] = useState(false);
  const [finalAssessmentActivated, setFinalAssessmentActivated] =
    useState(false);

  const conditionOptions = [
    "CONSCIOUS",
    "COHERENT",
    "AMBULATORY",
    "NOTINDISTRESS",
  ];

  const [formData, setFormData] = useState({
    afterAppointmentID: null,
    purpose: "",
    genSurvey: [] as string[],
    bloodPressure: "",
    pulseRate: "",
    respRate: "",
    bodyTemp: "",
    menstruation: "",
    LMP: "REGULAR",
    hypertension: "",
    bronchialAsthma: "",
    heartDisease: "",
    chestPain: "",
    seizureDisorder: "",
    others: "",
    LOC: "",
    injuries: "",
    skin: "",
    head: "",
    eyes: "",
    ears: "",
    neck: "",
    throat: "",
    chestAndLungs: "",
    heart: "",
    abdomen: "",
    gut: "",
    masculoSkeletal: "",
    neurological: "",
    CBC: "",
    urinalysis: "",
    fecalysis: "",
    chestXray: "",
    ECG: "",
    HBSAG: "",
    drugTest: "",
    isPhysicallyFit: false,
    clinicAssessment: "PENDING",
    forClearance: "",
    forLaboratory: "",
    forOthers: "",
    finalAssessment: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    const newValue =
      formData.clinicAssessment === "PENDING" ? "CLEARED" : "PENDING";
    setFormData({
      ...formData,
      clinicAssessment: newValue,
    });
  };

  const handlePhysicallyFitCheckboxChange = () => {
    const newValue = formData.isPhysicallyFit === false ? true : false;
    setFormData({
      ...formData,
      isPhysicallyFit: newValue,
    });
  };
  console.log(formData);

  const handleForClearanceCheckboxChange = () => {
    setForClearanceActivated(!forClearanceActivated);
    if (!forClearanceActivated) {
      setFormData({ ...formData, forClearance: "" });
    }
  };

  const handleForLaboratoryCheckboxChange = () => {
    setForLaboratoryActivated(!forLaboratoryActivated);
    if (!forLaboratoryActivated) {
      setFormData({ ...formData, forLaboratory: "" });
    }
  };

  const handleOthersCheckboxChange = () => {
    setOthersActivated(!othersActivated);
    if (!othersActivated) {
      setFormData({ ...formData, others: "" });
    }
  };

  const handleFinalAssessmentCheckboxChange = () => {
    setFinalAssessmentActivated(!finalAssessmentActivated);
    if (!finalAssessmentActivated) {
      setFormData({ ...formData, finalAssessment: "" });
    }
  };

  return (
    <div className="flex flex-row space-x-3 ">
      <div className="flex-grow">
        <h2 className="text-xl mb-4 font-bold text-white text-center">
          Assessment
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* LMP */}

          <div>
            <Text as="label" size="2">
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    formData.clinicAssessment === "PENDING" ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className=""
                    checked={formData.clinicAssessment === "PENDING"}
                    onChange={() => handleCheckboxChange()}
                  />
                </div>
                Pending
              </Flex>
            </Text>

            <Text as="label" size="2">
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    formData.clinicAssessment === "CLEARED" ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className=""
                    checked={formData.clinicAssessment === "CLEARED"}
                    onChange={() => handleCheckboxChange()}
                  />
                </div>
                Cleared
              </Flex>
            </Text>
          </div>

          {/* isPhysicallyFit */}

          <div>
            <p className="text-sm font-bold mb-1 mt-3">Remarks:</p>
            <Text as="label" size="2">
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    formData.isPhysicallyFit ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.isPhysicallyFit}
                    onChange={handlePhysicallyFitCheckboxChange}
                    className={""}
                  />
                </div>
                Physically Fit at the time of examination
              </Flex>
            </Text>
          </div>

          {/* Clearance */}
          <div>
            <p className="text-sm font-bold mb-1 mt-2">For Clearance:</p>
            <label>
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    forClearanceActivated ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={handleForClearanceCheckboxChange}
                  />
                </div>
              </Flex>
            </label>
            <input
              id="forClearance"
              name="forClearance"
              type="text"
              value={formData.forClearance}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                forClearanceActivated ? "" : "cursor-not-allowed bg-gray-200"
              }`}
              disabled={!forClearanceActivated}
            />
          </div>
          {/* Laboratory */}
          <div>
            <p className="text-sm font-bold  mb-1 mt-2">For Laboratory:</p>
            <label>
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    forLaboratoryActivated ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={handleForLaboratoryCheckboxChange}
                  />
                </div>
              </Flex>
            </label>
            <input
              id="forLaboratory"
              name="forLaboratory"
              type="text"
              value={formData.forLaboratory}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                forLaboratoryActivated ? "" : "cursor-not-allowed bg-gray-200"
              }`}
              disabled={!forLaboratoryActivated}
            />
          </div>
          {/* Others */}
          <div>
            <p className="text-sm font-bold  mb-1 mt-2">Others:</p>
            <label>
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    othersActivated ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={handleOthersCheckboxChange}
                  />
                </div>
              </Flex>
            </label>
            <input
              id="others"
              name="others"
              type="text"
              value={formData.others}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                othersActivated ? "" : "cursor-not-allowed bg-gray-200"
              }`}
              disabled={!othersActivated}
            />
          </div>
          {/* Final Assessment */}
          <div>
            <p className="text-sm font-bold  mb-1 mt-2">Final Assessment:</p>
            <label>
              <Flex gap="2">
                <div
                  className={`h-4 w-4 border-2 border-black rounded ${
                    finalAssessmentActivated ? "bg-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    onChange={handleFinalAssessmentCheckboxChange}
                  />
                </div>
              </Flex>
            </label>
            <input
              id="finalAssessment"
              name="finalAssessment"
              type="text"
              value={formData.finalAssessment}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 pl-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                finalAssessmentActivated ? "" : "cursor-not-allowed bg-gray-200"
              }`}
              disabled={!finalAssessmentActivated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
