'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendar,
  faDoorOpen,
  faHome,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/Button/button';

export default function Header() {
  const currentRoute = usePathname();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsDropdownOpen(false);
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="px-10 my-5">
      <div className="flex justify-between items-center">
        <div className="flex-none">
          <span>
            <Link href="/">Plan Together</Link>
          </span>
        </div>
        {session ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-center w-full">
              <div className="flex gap-16">
                {/* Le contenu pour les utilisateurs authentifiés */}

                <Link
                  href="/dashboard"
                  className={` ${
                    currentRoute === '/dashboard'
                      ? 'font-extrabold border-b-2 border-black p-0 text-lg'
                      : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out text-lg'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ paddingRight: '8px' }}
                  />
                  Dashboard
                </Link>

                <Link
                  href="/activities"
                  className={` ${
                    currentRoute === '/plan-it/activities'
                      ? 'font-extrabold border-b-2 border-black text-lg'
                      : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out text-lg'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ paddingRight: '8px' }}
                  />
                  Evènements
                </Link>

                <Link
                  href="/notifications"
                  className={` ${
                    currentRoute === '/notifications'
                      ? 'font-extrabold border-b-2 border-black text-lg'
                      : 'border-b-2 border-transparent hover:border-gray-300 transition duration-300 ease-in-out text-lg'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    style={{ paddingRight: '8px' }}
                  />
                  Notifications
                </Link>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="w-52 flex justify-end">
                <Button
                  buttonType="create"
                  content="Créer un évènement"
                  icon={faPlus}
                  className="whitespace-nowrap flex flex-row-reverse w-9 hover:opacity-80 hover:w-52 duration-300 ease-in-out hover:border-collapse"
                />
              </div>
              <div
                className="flex-none whitespace-nowrap relative"
                ref={dropdownRef}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="bg-primary hover:opacity-80 transition duration-300 p-2.5 rounded-full text-white">
                    DL
                    {/* TODO: Implémenter l'avatar si il est stocké sinon les initiales de l'utilisateur */}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[40px] flex flex-col items-center left-[-100px] z-10 bg-white border border-gray-300 p-2 rounded">
                    <Link href="/profile" className="block p-px py-1 w-full">
                      <Button
                        buttonType="primary"
                        content="Profil"
                        className="hover:opacity-80 transition duration-300 w-full"
                        icon={faUser}
                      />
                    </Link>
                    <div className="block p-px py-1 w-full">
                      <Button
                        buttonType="warning"
                        content="Déconnexion"
                        className="hover:opacity-80 transition duration-300 w-full"
                        icon={faDoorOpen}
                        onClick={() => signOut()}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Le contenu pour les utilisateurs non authentifiés */}
            <Link href="/register" style={{ paddingRight: '10px' }}>
              Register
            </Link>
            <Button
              buttonType="primary"
              content="Se connecter"
              onClick={() => signIn()}
            />
          </div>
        )}
      </div>
    </header>
  );
}