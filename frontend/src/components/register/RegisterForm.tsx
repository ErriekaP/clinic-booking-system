'use client';
import { Flex, Select, Tabs, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import '../../components/styles.css';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formRegisterData, setFormRegisterData] = useState({
    email: '',
    password: '',
    patientType: ''
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegisterSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formRegisterData.email === '' || formRegisterData.password === '' || formRegisterData.patientType === '') {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patients/registerpatients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formRegisterData
        })
      });
      //after registering, it logins the patient

      if (response.ok) {
        await supabase.auth.signInWithPassword({
          email: formRegisterData.email,
          password: formRegisterData.password
        });
        const patient = await response.json();
        toast.success('Registered Successfully');
        if (patient.data.patientType === 'STUDENT') {
          router.push(`/register/patient/student/${patient.data.id}`);
        } else if (patient.data.patientType === 'EMPLOYEE') {
          router.push(`/register/patient/employees/${patient.data.id}`);
        }
      } else {
        toast.error('Invalid Email, Password or Role');
        //setMessage("Invalid Email, Password or Role");
      }
    } catch (error) {
      toast.error('Invalid Email, Password or Role');
    }
  };

  const handleRegisterInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormRegisterData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (newValue: string | null, fieldName: 'patientType') => {
    setSelectedItem(newValue);
    setFormRegisterData((prevState) => ({
      ...prevState,
      [fieldName]: newValue || ''
    }));
  };

  return (
    <Flex className='TabsContainer'>
      <Tabs.Root className='TabsRoot' defaultValue='tab2'>
        <form onSubmit={handleRegisterSubmit}>
          <Tabs.Content className='TabsContent' value='tab2'>
            <p className='Text'>Register your account here!</p>
            <fieldset className='Fieldset'>
              <label className='Label' htmlFor='email'>
                Email
              </label>
              <input className='Input' id='email' type='email' name='email' value={formRegisterData.email} onChange={handleRegisterInputChange} />
            </fieldset>
            <fieldset className='Fieldset'>
              <label className='Label' htmlFor='password'>
                Password
              </label>
              <input
                className='Input'
                id='password'
                type='password'
                name='password'
                value={formRegisterData.password}
                onChange={handleRegisterInputChange}
              />
            </fieldset>

            <fieldset className='Fieldset'>
              <label className='Label' htmlFor='role'>
                Role
              </label>
              <Select.Root name='patientType' onValueChange={(newValue) => handleSelectChange(newValue, 'patientType')}>
                <Select.Trigger className='SelectTrigger' />
                <Select.Content className='SelectContent'>
                  <Select.Group>
                    <Select.Label>Role</Select.Label>
                    <Select.Item className='SelectItem' value='STUDENT'>
                      Student
                    </Select.Item>
                    <Select.Item className='SelectItem' value='EMPLOYEE'>
                      Employee
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </fieldset>

            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'flex-end'
              }}
            >
              <button className='Button' type='submit'>
                Register
              </button>
            </div>
          </Tabs.Content>
        </form>
      </Tabs.Root>
    </Flex>
  );
}
