import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import * as Avatar from '@radix-ui/react-avatar';
import * as Separator from '@radix-ui/react-separator';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PersonIcon } from '@radix-ui/react-icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { fetchUserInfo } from '@/utilities/fetch/patient';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  patientType: 'STUDENT' | 'EMPLOYEE';
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'STAFF';
  email: string;
}

const BackNavbar = () => {
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

  console.log('user', user);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleBack = async () => {
    router.back();
  };
  return (
    <div className='flex justify-start z-1'>
      <button onClick={handleBack}>
        <div className='bg-white rounded-md p-3 px-4 shadow-s hover:cursor-pointer'>
          <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z'
              fill='currentColor'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        </div>
      </button>
      {/* <NavigationMenu.Root className="NavigationMenuRootStart">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item className="NavigationMenuItem">
            <button onClick={handleBack}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root> */}
    </div>
  );
};

export default BackNavbar;
