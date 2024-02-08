"use client";
import * as Label from '@radix-ui/react-label';
import '../student/styles.css';

import { Card, Container, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";

export default function Page(){
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
            <Container>
                <Flex display="flex" direction="column" align="center" justify="center">
                    <Heading>
                        <Text>Info</Text>
                    </Heading>
                </Flex>
                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Basic Details</p>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="schoolID">
                            School ID
                        </label>
                        <input className="Input" id="schoolID" />
                        </fieldset>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="firstname">
                            FirstName
                        </label>
                        <input className="Input" id="firstname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="middlename">
                            MiddleName
                        </label>
                        <input className="Input" id="middlename" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="lastname">
                            LastName
                        </label>
                        <input className="Input" id="lastname" />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="occupation">
                            Occupation
                        </label>
                        <input className="Input" id="occupation" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="facultydept">
                            Faculty Department
                        </label>
                        <input className="Input" id="facultydept" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="contactno">
                            Contact Number
                        </label>
                        <input className="Input" id="contactno"  />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >
                      
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="dateofbirth">
                            Date of Birth
                        </label>
                        <input className="Input" id="dateofbirth" type='date'/>
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
                            <Select.Item className='SelectItem' value="male">Male</Select.Item>
                            <Select.Item className='SelectItem' value="female">Female</Select.Item>
                            <Select.Item className='SelectItem' value="nonbinary">Non-Binary</Select.Item>
                            <Select.Item className='SelectItem' value="agender">Agender</Select.Item>
                            <Select.Item className='SelectItem' value="genderfluif">Gender Fluid</Select.Item>
                            <Select.Item className='SelectItem' value="bigender">Bigender</Select.Item>
                            <Select.Item className='SelectItem' value="androgynous">Androgynous</Select.Item>
                            <Select.Item className='SelectItem' value="prefernottosay">Prefer not to say</Select.Item>
                            <Select.Item className='SelectItem' value="other">Other</Select.Item>
                            </Select.Group>
                        </Select.Content>
                        </Select.Root>

                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="bloodtype">
                            Blood Type
                        </label>

                        <Select.Root defaultValue="O">
                        <Select.Trigger className='SelectTrigger' />
                        <Select.Content className='SelectContent'>
                            <Select.Group>
                            <Select.Label className='SelectLabel'>Blood Type</Select.Label>
                            <Select.Item className='SelectItem' value="O">O</Select.Item>
                            <Select.Item className='SelectItem' value="A">A</Select.Item>
                            <Select.Item className='SelectItem' value="B">B</Select.Item>
                            <Select.Item className='SelectItem' value="AB">AB</Select.Item>
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
                        <input className="Input" id="houseno" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="subdivision">
                            Subdivision
                        </label>
                        <input className="Input" id="subdivision" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="street">
                            Street
                        </label>
                        <input className="Input" id="street" />
                        </fieldset>
                        </Flex>

                        <Flex direction="row" gap="3" >

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="barangay">
                            Barangay
                        </label>
                        <input className="Input" id="barangay" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="city">
                            City
                        </label>
                        <input className="Input" id="city" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="province">
                            Province
                        </label>
                        <input className="Input" id="province" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="zipcode">
                            Zipcode
                        </label>
                        <input className="Input" id="zipcode" />
                        </fieldset>
                        
                        </Flex>
                        
                    </Card>
                </Flex>

                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Emergency Contact</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="firstname">
                            FirstName
                        </label>
                        <input className="Input" id="firstname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="lastname">
                            LastName
                        </label>
                        <input className="Input" id="lastname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="contactno">
                            Contact Number
                        </label>
                        <input className="Input" id="contactno" />
                        </fieldset>

                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="relation">
                            Relation
                        </label>
                        <input className="Input" id="relation" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="healthinsurance">
                            Health Insurance Company
                        </label>
                        <input className="Input" id="healthinsurance" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="emergencyhosp">
                            Emergency Hospital
                        </label>
                        <input className="Input" id="emergencyhosp" />
                        </fieldset>
                            
                        </Flex>
             
                        
                    </Card>
                </Flex>

                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Family Physician</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="firstname">
                            FirstName
                        </label>
                        <input className="Input" id="firstname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="lastname">
                            LastName
                        </label>
                        <input className="Input" id="lastname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="contactno">
                            Contact Number
                        </label>
                        <input className="Input" id="contactno" />
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
                        <input className="Input" id="famHistory" />
                        </fieldset>
                        
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="childhoodDiseases">
                            Childhood Diseases
                        </label>
                        <input className="Input" id="childhoodDiseases" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medicalCondition">
                            Medical Condition
                        </label>
                        <input className="Input" id="medicalCondition" />
                        </fieldset>

                        </Flex>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="hospitalization">
                            Hospitalization
                        </label>
                        <input className="Input" id="hospitalization" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="medication">
                            Medication
                        </label>
                        <input className="Input" id="medication" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="allergies">
                            Allergies
                        </label>
                        <input className="Input" id="allergies" />
                        </fieldset>

     
                        </Flex>

                        <Flex direction="row" gap="3" >

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="vaccines">
                            Vaccines
                        </label>
                        <input className="Input" id="vaccines" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="psychosocialHistory">
                            Psychosocial History
                        </label>
                        <input className="Input" id="psychosocialHistory" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="sexualHistory">
                            SexualHistory
                        </label>
                        <input className="Input" id="sexualHistory" />
                        </fieldset>

                        </Flex>
   
                    </Card>

                </Flex>

                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                            <button className="Button blue">Submit</button>
                    </div>
            </Container>
        </main>
    )
}