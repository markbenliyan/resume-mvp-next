/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { getAuth } from "firebase/auth";
import { app } from '../../../lib/firebase';


const DEFAULT_PHOTO_URL = "https://www.lightsong.net/wp-content/uploads/2020/12/blank-profile-circle.png"

const CurrentUserIcon: React.FC = () => {
  const [photoURL, setPhotoURL] = useState(DEFAULT_PHOTO_URL);

  const auth = getAuth(app)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && user.photoURL) {
        setPhotoURL(user.photoURL);
      }
    });
  }, [auth]);

  const signOut = () => {
    auth.signOut()
      .then(() => {
        console.log("Signed out successfully!");
      })
      .catch((error) => {
        console.log("An error occurred while signing out", error);
      });
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={photoURL}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Menu items here */}
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={active ? 'bg-gray-100 block px-4 py-2 text-sm text-gray-700' : 'block px-4 py-2 text-sm text-gray-700'}
                onClick={signOut}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CurrentUserIcon;
