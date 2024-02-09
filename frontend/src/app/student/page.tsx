"use client";
import { Form } from '@radix-ui/react-form';
import './styles.css';
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
        patientType: 'STUDENT',
        course: '',
        section: '',
        cluster: '',
        department: '',
        occupation: '',
        facultyDepartment: '',
        contactNumber: '',
        dateOfBirth: '2020-03-20',
        gender: 'MALE',
        bloodType: 'O',
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

        if (name.startsWith('address.')) {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name.split('.')[1]]: value 
                }
            }));
        } 
        else if (name.startsWith('emergencyContact.')) {
            setFormData(prevState => ({
                ...prevState,
                emergencyContact: {
                    ...prevState.emergencyContact,
                    [name.split('.')[1]]: value 
                }
            }));
        } 

        else if (name.startsWith('familyPhysician.')) {
            setFormData(prevState => ({
                ...prevState,
                familyPhysician: {
                    ...prevState.familyPhysician,
                    [name.split('.')[1]]: value 
                }
            }));
        } 
        else if (name.startsWith('medicalHistory.')) {
            setFormData(prevState => ({
                ...prevState,
                medicalHistory: {
                    ...prevState.medicalHistory,
                    [name.split('.')[1]]: value 
                }
            }));
        } 
        
        else {
    
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        
  
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
                        <label className="Label" htmlFor="firstName">
                            FirstName
                        </label>
                        <input className="Input" 
                        id="firstName" 
                        name="firstName"
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
                        <label className="Label" htmlFor="lastName">
                            LastName
                        </label>
                        <input className="Input" 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange} 
                         />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="course">
                            Course
                        </label>
                        <input className="Input" 
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="section">
                            Section
                        </label>
                        <input className="Input" 
                        id="section"
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="cluster">
                            Cluster
                        </label>
                        <input className="Input" 
                        id="cluster"
                        name="cluster"
                        value={formData.cluster}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="department">
                            Department
                        </label>
                        <input className="Input" 
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}   />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="contactNumber">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="contactNumber"
                        name="contactNumber"
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
                            value="male"
                            onSelect={() => setFormData({ ...formData, gender: 'MALE' })}>Male</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="female"
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
                        <label className="Label" htmlFor="bloodtype">
                            Blood Type
                        </label>

                        <Select.Root name='bloodType' >
                        <Select.Trigger className='SelectTrigger' />
                        <Select.Content className='SelectContent'>
                            <Select.Group>
                            <Select.Label className='SelectLabel'>Blood Type</Select.Label>
                            <Select.Item className='SelectItem' 
                            value="O"
                            onSelect={() => setFormData({ ...formData, bloodType: 'O' })}>O</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="A"
                            onSelect={() => setFormData({ ...formData, bloodType: 'A' })}>A</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="B"
                            onSelect={() => setFormData({ ...formData, bloodType: 'B' })}>B</Select.Item>
                            <Select.Item className='SelectItem' 
                            value="AB"
                            onSelect={() => setFormData({ ...formData, bloodType: 'AB' })}>AB</Select.Item>
                            </Select.Group>
                        </Select.Content>
                        </Select.Root>

                        </fieldset>


                        </Flex>
                      
                    </Card>
                </Flex>
                <Flex>
                    <Card className="CardsContent" >

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="houseNo">
                            House No.
                        </label>
                        <input className="Input" 
                        id="houseNo"
                        name="address.houseNo"
                        value={formData.address.houseNo}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="subdivision">
                            Subdivision
                        </label>
                        <input className="Input" 
                        id="subdivision"
                        name="address.subdivision"
                        value={formData.address.subdivision}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="street">
                            Street
                        </label>
                        <input className="Input" 
                        id="street"
                        name="address.street"
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
                        name="address.barangay"
                        value={formData.address.barangay}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="city">
                            City
                        </label>
                        <input className="Input" 
                        id="city"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="province">
                            Province
                        </label>
                        <input className="Input" 
                        id="province"
                        name="address.province"
                        value={formData.address.province}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="zipcode">
                            Zipcode
                        </label>
                        <input className="Input" 
                        id="zipcode"
                        name="address.zipCode"
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
                        name="emergencyContact.firstName"
                        value={formData.emergencyContact.firstName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="ecLastname">
                            LastName
                        </label>
                        <input className="Input" 
                        id="ecLastname"
                        name="emergencyContact.lastName"
                        value={formData.emergencyContact.lastName}
                        onChange={handleInputChange}/>
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="ecContactno">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="ecContactno"
                        name="emergencyContact.contactNumber"
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
                        name="emergencyContact.relation"
                        value={formData.emergencyContact.relation}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="healthinsurance">
                            Health Insurance Company
                        </label>
                        <input className="Input" 
                        id="healthinsurance"
                        name="emergencyContact.healthInsuranceCompany"
                        value={formData.emergencyContact.healthInsuranceCompany}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="emergencyhosp">
                            Emergency Hospital
                        </label>
                        <input className="Input" 
                        id="emergencyhosp"
                        name="emergencyContact.emergencyHospital"
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
                        name="familyPhysician.firstName"
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
                        name="familyPhysician.lastName"
                        value={formData.familyPhysician.lastName}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="fpContactno">
                            Contact Number
                        </label>
                        <input className="Input" 
                        id="fpContactno"
                        name="familyPhysician.contactNumber"
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
                        name="medicalHistory.famHistory"
                        value={formData.medicalHistory.famHistory}
                        onChange={handleInputChange} />
                        </fieldset>
                        
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="childhoodDiseases">
                            Childhood Diseases
                        </label>
                        <input className="Input" 
                        id="childhoodDiseases"
                        name="medicalHistory.childhoodDiseases"
                        value={formData.medicalHistory.childhoodDiseases}
                        onChange={handleInputChange} />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medicalCondition">
                            Medical Condition
                        </label>
                        <input className="Input" 
                        id="medicalCondition"
                        name="medicalHistory.medicalCondition"
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
                        name="medicalHistory.hospitalization"
                        value={formData.medicalHistory.hospitalization}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medication">
                            Medication
                        </label>
                        <input className="Input" 
                        id="medication"
                        name="medicalHistory.medication"
                        value={formData.medicalHistory.medication}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="allergies">
                            Allergies
                        </label>
                        <input className="Input" 
                        id="allergies"
                        name="medicalHistory.allergies"
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
                        name="medicalHistory.vaccines"
                        value={formData.medicalHistory.vaccines}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="psychosocialHistory">
                            Psychosocial History
                        </label>
                        <input className="Input" 
                        id="psychosocialHistory"
                        name="medicalHistory.psychosocialHistory"
                        value={formData.medicalHistory.psychosocialHistory}
                        onChange={handleInputChange}  />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="sexualHistory">
                            SexualHistory
                        </label>
                        <input className="Input" 
                        id="sexualHistory"
                        name="medicalHistory.sexualHistory"
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