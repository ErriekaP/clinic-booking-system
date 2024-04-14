"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [showMedicineInput, setShowMedicineInput] = useState(false);

  const [formData, setFormData] = useState({
    appointmentID: parseInt(params.id, 10),
    diagnosis: "",
    medications: [
      {
        medicineName: "",
        medicineStrength: "",
        medicineQuantity: "",
        medicineFrequency: "",
        remarks: "",
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterAppointment/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully");
        router.back();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMedicine = () => {
    setFormData((prevState) => ({
      ...prevState,
      medications: [
        ...prevState.medications,
        {
          medicineName: "",
          medicineStrength: "",
          medicineQuantity: "",
          medicineFrequency: "",
          remarks: "",
        },
      ],
    }));
  };

  const handleMedicineInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      medications: updatedMedications,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <h2 className="text-xl mb-4 font-bold text-white text-center">
          Doctor's Note
        </h2>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddMedicine}
          >
            Add Medicine
          </button>
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="diagnosis"
            >
              Diagnosis
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="diagnosis"
              rows={6}
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
            />
          </div>
          {formData.medications.map((medicine, index) => (
            <>
              <p className="font-bold mb-3">Medicine {index + 1}</p>
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 text-sm  mb-2"
                  htmlFor={`medicineName-${index}`}
                >
                  Medicine Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`medicineName-${index}`}
                  name={`medicineName-${index}`}
                  type="text"
                  value={medicine.medicineName}
                  onChange={(e) =>
                    handleMedicineInputChange(
                      index,
                      "medicineName",
                      e.target.value
                    )
                  }
                />
              </div>
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor={`medicineStrength-${index}`}
                >
                  Medicine Strength
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`medicineStrength-${index}`}
                  name={`medicineStrength-${index}`}
                  type="text"
                  value={medicine.medicineStrength}
                  onChange={(e) =>
                    handleMedicineInputChange(
                      index,
                      "medicineStrength",
                      e.target.value
                    )
                  }
                />
              </div>
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor={`medicineQuantity-${index}`}
                >
                  Medicine Quantity
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`medicineQuantity-${index}`}
                  name={`medicineQuantity-${index}`}
                  type="text"
                  value={medicine.medicineQuantity}
                  onChange={(e) =>
                    handleMedicineInputChange(
                      index,
                      "medicineQuantity",
                      e.target.value
                    )
                  }
                />
              </div>
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor={`medicineFrequency-${index}`}
                >
                  Medicine Frequency
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`medicineFrequency-${index}`}
                  name={`medicineFrequency-${index}`}
                  type="text"
                  value={medicine.medicineFrequency}
                  onChange={(e) =>
                    handleMedicineInputChange(
                      index,
                      "medicineFrequency",
                      e.target.value
                    )
                  }
                />
              </div>
              <div key={index} className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor={`remarks-${index}`}
                >
                  Remarks
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`remarks-${index}`}
                  name={`remarks-${index}`}
                  type="text"
                  value={medicine.remarks}
                  onChange={(e) =>
                    handleMedicineInputChange(index, "remarks", e.target.value)
                  }
                />
              </div>
            </>
          ))}
          <div className="flex items-center justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline mt-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Page;
