"use client";
import { Form } from '@radix-ui/react-form';
import '../student/styles.css';
import { Card, Container, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page(){

    const [formData, setFormData] = useState({
        schoolID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address: {
            city: '',
            province: '',
            zipCode: '',
            houseNo: '',
            street: '',
            barangay: '',
            subdivision: ''
        },
        patientType: 'TEACHER',
        course: '',
        section: '',
        cluster: '',
        department: '',
        occupation: '',
        facultyDepartment: '',
        contactNumber: '',
        dateOfBirth: '2020-03-20',
        gender: 'MALE',
        bloodType: '',
        emergencyContact: {
            firstName: '',
            lastName: '',
            contactNumber: '',
            relation: '',
            healthInsuranceCompany: '',
            emergencyHospital: ''
        },
        familyPhysician: {
            firstName: '',
            lastName: '',
            contactNumber: ''
        },
        medicalHistory: {
            famHistory: '',
            childhoodDiseases: '',
            medicalCondition: '',
            hospitalization: '',
            medication: '',
            allergies: '',
            vaccines: '',
            psychosocialHistory: '',
            sexualHistory: ''
        },
        status: 'ACTIVE'
    });


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData, dateOfBirth:`${formData.dateOfBirth}T00:00:00.000Z`}),
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                const patients = await response.json();
                console.log(patients);
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectBloodType = (selectedBloodType: any) => {
        // Update the formData state with the selected blood type
        setFormData({ ...formData, bloodType: selectedBloodType });
    };
   console.log(formData)
    
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
            <Container> 
             <form onSubmit={handleSubmit}>
                <Flex display="flex" direction="column" align="center" justify="center">
                    <Heading>
                        <Text>Info</Text>
                    </Heading>
                </Flex>
                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Basic Details</p>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="schoolID">School ID</label>
                    <input
                        className='Input'
                        id="schoolID"
                        name="schoolID"
                        value={formData.schoolID}
                        onChange={handleInputChange}
                        />
                        </fieldset>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="pFirstname">
                            FirstName
                        </label>
                        <input className="Input" 
                        id="pFirstname" 
                        name="pFirstname"
                        value={formData.firstName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="middleName">
                            MiddleName
                        </label>
                        <input className="Input" 
                        id="middleName"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="pLastname">
                            LastName
                        </label>
                        <input className="Input" 
                        id="pLastname"
                        name="pLastname"
                        value={formData.lastName}
                        onChange={handleInputChange} 
                         />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="department">
                            Department
                        </label>
                        <input className="Input" 
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="occupation">
                            Occupation
                        </label>
                        <input className="Input" 
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="faculty">
                            Faculty
                        </label>
                        <input className="Input" 
                        id="faculty"
                        name="faculty"
                        value={formData.facultyDepartment}
                        onChange={handleInputChange}  />
                        </fieldset>

           
                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="pContactno">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="pContactno"
                        name="pContactno"
                        value={formData.contactNumber}
                        onChange={handleInputChange}   />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="dateOfbirth">
                            Date of Birth
                        </label>
                        <input className="Input" 
                        id="dateOfBirth" 
                        type='date'
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="gender">
                            Gender
                        </label>

                        <Select.Root defaultValue="Male">
                        <Select.Trigger className='SelectTrigger' />
                        <Select.Content className='SelectContent'>
                            <Select.Group>
                            <Select.Label className='SelectLabel'>Gender</Select.Label>
                            <Select.Item className='SelectItem' 
                            value="MALE"
                            onSelect={() => setFormData({ ...formData, gender: 'MALE' })}>Male</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="FEMALE"
                            onSelect={() => setFormData({ ...formData, gender: 'FEMALE' })}>Female</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="nonbinary"
                            onSelect={() => setFormData({ ...formData, gender: 'NON-BINARY' })}>Non-Binary</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="agender"
                            onSelect={() => setFormData({ ...formData, gender: 'AGENDER' })}>Agender</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="genderfluid"
                            onSelect={() => setFormData({ ...formData, gender: 'GENDER FLUID' })}>Gender Fluid</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="bigender"
                            onSelect={() => setFormData({ ...formData, gender: 'BIGENDER' })}>Bigender</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="androgynous"
                            onSelect={() => setFormData({ ...formData, gender: 'ANDROGYNOUS' })}>Androgynous</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="prefernottosay"
                            onSelect={() => setFormData({ ...formData, gender: 'PREFER NOT TO SAY' })}>Prefer not to say</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="other"
                            onSelect={() => setFormData({ ...formData, gender: 'OTHER' })}>Other</Select.Item>
                            </Select.Group>
                        </Select.Content>
                        </Select.Root>

                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="bloodType">
                            Blood Type
                        </label>
                        <p>Selected Blood Type: {formData.bloodType}</p>

                        <Select.Root  >
                        <Select.Trigger className='SelectTrigger' />
                        <Select.Content className='SelectContent'>
                            <Select.Group>
                            <Select.Label className='SelectLabel'>Blood Type</Select.Label>
                            <Select.Item className='SelectItem' 
                            value="O"
                            onSelect={() => handleInputChange({ target: { name: 'bloodType', value: 'O' } })}>O</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="A"
                            onSelect={() => handleInputChange({ target: { name: 'bloodType', value: 'A' } })}>A</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="B"
                            >B</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="AB"
                            >AB</Select.Item>
                            </Select.Group>
                        </Select.Content>
                        </Select.Root>

                        </fieldset>


                        </Flex>
                      
                    </Card>
                </Flex>
                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Address</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="houseno">
                            House No.
                        </label>
                        <input className="Input" 
                        id="houseno"
                        name="houseno"
                        value={formData.address.houseNo}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="subdivision">
                            Subdivision
                        </label>
                        <input className="Input" 
                        id="subdivision"
                        name="subdivision"
                        value={formData.address.subdivision}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="street">
                            Street
                        </label>
                        <input className="Input" 
                        id="street"
                        name="street"
                        value={formData.address.street}
                        onChange={handleInputChange} />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="barangay">
                            Barangay
                        </label>
                        <input className="Input" 
                        id="barangay"
                        name="barangay"
                        value={formData.address.barangay}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="city">
                            City
                        </label>
                        <input className="Input" 
                        id="city"
                        name="city"
                        value={formData.address.city}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="province">
                            Province
                        </label>
                        <input className="Input" 
                        id="province"
                        name="province"
                        value={formData.address.province}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="zipcode">
                            Zipcode
                        </label>
                        <input className="Input" 
                        id="zipcode"
                        name="zipcode"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}  />
                        </fieldset>
                        
                        </Flex>
                        
                    </Card>
                </Flex>

                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Emergency Contact</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="ecFirstname">
                            FirstName
                        </label>
                        <input className="Input" 
                        id="ecFirstname"
                        name="ecFirstname"
                        value={formData.emergencyContact.firstName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="ecLastname">
                            LastName
                        </label>
                        <input className="Input" 
                        id="ecLastname"
                        name="ecLastname"
                        value={formData.emergencyContact.lastName}
                        onChange={handleInputChange}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="ecContactno">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="ecContactno"
                        name="ecContactno"
                        value={formData.emergencyContact.contactNumber}
                        onChange={handleInputChange}  />
                        </fieldset>

                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="relation">
                            Relation
                        </label>
                        <input className="Input" 
                        id="relation"
                        name="relation"
                        value={formData.emergencyContact.relation}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="healthinsurance">
                            Health Insurance Company
                        </label>
                        <input className="Input" 
                        id="healthinsurance"
                        name="healthinsurance"
                        value={formData.emergencyContact.healthInsuranceCompany}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="emergencyhosp">
                            Emergency Hospital
                        </label>
                        <input className="Input" 
                        id="emergencyhosp"
                        name="emergencyhosp"
                        value={formData.emergencyContact.emergencyHospital}
                        onChange={handleInputChange} />
                        </fieldset>
                            
                        </Flex>
             
                        
                    </Card>
                </Flex>

                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Family Physician</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="fpFirstname">
                            FirstName
                        </label>
                        <input className="Input" 
                        id="fpFirstname"
                        name="fpFirstname"
                        value={formData.familyPhysician.firstName}
                        onChange={handleInputChange}
                          />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="fpLastname">
                            LastName
                        </label>
                        <input className="Input" 
                        id="fpLastname"
                        name="fpLastname"
                        value={formData.familyPhysician.lastName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="fpContactno">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="fpContactno"
                        name="fpContactno"
                        value={formData.familyPhysician.contactNumber}
                        onChange={handleInputChange} />
                        </fieldset>
                        </Flex>

                        
                    </Card>
                </Flex>
           
                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Medical History</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="famHistory">
                            Family History
                        </label>
                        <input className="Input" 
                        id="famHistory"
                        name="famHistory"
                        value={formData.medicalHistory.famHistory}
                        onChange={handleInputChange} />
                        </fieldset>
                        
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="childhoodDiseases">
                            Childhood Diseases
                        </label>
                        <input className="Input" 
                        id="childhoodDiseases"
                        name="childhoodDiseases"
                        value={formData.medicalHistory.childhoodDiseases}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medicalCondition">
                            Medical Condition
                        </label>
                        <input className="Input" 
                        id="medicalCondition"
                        name="medicalCondition"
                        value={formData.medicalHistory.medicalCondition}
                        onChange={handleInputChange}  />
                        </fieldset>

                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="hospitalization">
                            Hospitalization
                        </label>
                        <input className="Input" 
                        id="hospitalization"
                        name="hospitalization"
                        value={formData.medicalHistory.hospitalization}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medication">
                            Medication
                        </label>
                        <input className="Input" 
                        id="medication"
                        name="medication"
                        value={formData.medicalHistory.medication}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="allergies">
                            Allergies
                        </label>
                        <input className="Input" 
                        id="allergies"
                        name="allergies"
                        value={formData.medicalHistory.allergies}
                        onChange={handleInputChange}  />
                        </fieldset>

     
                        </Flex>

                        <Flex direction="row" gap="3" >

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="vaccines">
                            Vaccines
                        </label>
                        <input className="Input" 
                        id="vaccines"
                        name="vaccines"
                        value={formData.medicalHistory.vaccines}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="psychosocialHistory">
                            Psychosocial History
                        </label>
                        <input className="Input" 
                        id="psychosocialHistory"
                        name="psychosocialHistory"
                        value={formData.medicalHistory.psychosocialHistory}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="sexualHistory">
                            SexualHistory
                        </label>
                        <input className="Input" 
                        id="sexualHistory"
                        name="sexualHistory"
                        value={formData.medicalHistory.sexualHistory}
                        onChange={handleInputChange}  />
                        </fieldset>

                        </Flex>
   
                    </Card>

                </Flex>

                <div className='flex mt-20 justify-end'>
                            <button className="Button blue" type='submit'>Submit</button>
                    </div>
                    </form>
            </Container>
        </main>
    )
}