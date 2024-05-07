import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import * as Separator from '@radix-ui/react-separator';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import '../../components/styles.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { fetchUserInfo } from '@/utilities/fetch/patient';
import Image from 'next/image';
import Link from 'next/link';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  patientType: 'STUDENT' | 'EMPLOYEE';
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'STAFF';
  email: string;
}

const NavMenu = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userType, setUserType] = useState<string>();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Retrieve the session from Supabase
        const { data: session, error } = await supabase.auth.getUser();
        if (error) {
          throw new Error('Failed to fetch session');
        }

        console.log('sess', session);

        if (session && session.user) {
          // Fetch user info from your API using the user ID
          const userInfo = await fetchUserInfo(session.user.id);

          let newUserType;
          if (userInfo.role != null) {
            newUserType = userInfo.role;
          } else {
            newUserType = userInfo.patientType;
          }

          // Set user type and ID in state
          setUserType(newUserType);
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Handle error or show error message to the user
      }
    };

    getUserInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='navbar w-[55rem] bg-[#D9DCD6] rounded'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </div>
            <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
              <li>
                <Link className='' href='/patients'>
                  Patients
                </Link>
              </li>
              <li>
                <a>Personnel</a>
                <ul className='p-2'>
                  <li>
                    <Link className='' href='/register/personnel'>
                      Add Personnel
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/personnels'>
                      View Personnel
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=''
                      href='/schedules
'
                    >
                      Work Schedules
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className='' href='/services/admin'>
                  Services
                </Link>
              </li>
              <li>
                <a>Appointment</a>
                <ul className='p-2'>
                  <li>
                    <Link className='' href='/appointments'>
                      View Appointments
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/appointments/requests'>
                      Appointment Requests
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/emergency'>
                      Add Emergency Appointment
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Queues</a>
                <ul className='p-2'>
                  <li>
                    <Link className='' href='/queues/services'>
                      Queues
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/queues/afterQueues'>
                      All Queues
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button className='btn btn-ghost p-2' onClick={() => router.push('/home')}>
            <Image className='w-[3rem]' src='/logo.png' alt='logo' width={100} height={100} />
          </button>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link className='' href='/patients'>
                Patients
              </Link>
            </li>
            <li>
              <details>
                <summary>Personnel</summary>
                <ul className='p-2 w-[15rem]'>
                  <li>
                    <Link className='' href='/register/personnel'>
                      Add Personnel
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/personnels'>
                      View Personnel
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/schedules'>
                      Work Schedules
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link className='' href='/services/admin'>
                Services
              </Link>
            </li>
            <li>
              <details>
                <summary>Appointment</summary>
                <ul className='p-2 w-[15rem]'>
                  <li>
                    <Link className='' href='/appointments'>
                      View Appointments
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/appointments/requests'>
                      Appointment Requests
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/emergency'>
                      Add Emergency Appointment
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Queues</summary>
                <ul className='p-2 w-[15rem]'>
                  <li>
                    <Link className='' href='/queues/services'>
                      Queues
                    </Link>
                  </li>
                  <li>
                    <Link className='' href='/queues/afterQueues'>
                      All Queues
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='flex gap-4 items-center'>
            <p className='text-sm'>{`Hi, ${user?.firstName}`}</p>
            <div className='hover:cursor-pointer mr-4'>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className='IconButton' aria-label='Customise options'>
                    <PersonIcon />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5}>
                    <DropdownMenu.Item className='DropdownMenuItem' onClick={handleLogout}>
                      Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
