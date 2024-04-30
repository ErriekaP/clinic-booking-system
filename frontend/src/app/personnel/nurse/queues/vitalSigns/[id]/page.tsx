//dito kay page ng afterqueues makita dito ang diagnosis, medication
"use client";
import BackNavbar from "@/components/backNavbar/backNavbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [showMedicineInput, setShowMedicineInput] = useState(false);

  const [formData, setFormData] = useState({
    queueID: parseInt(params.id, 10),
    diagnosis: "",
    medications: [
      {
        medicineName: "",
        medicineStrength: "",
        medicineQuantity: "",
        medicineFrequency: "",
        remarks: "",
        afterAppointmentID: null,
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/afterQueue/add`,
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

  return (
    <div>
      <BackNavbar />

      <div className="flex min-h-screen flex-col items-center justify-between p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <h2 className="text-xl mb-4 font-bold text-white text-center">
            Vital Signs
          </h2>

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
      </div>
    </div>
  );
};

export default Page;
