/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from '../../lib/firebase';
import { useRouter } from 'next/router';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth(app);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      setEmailSent(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email address.');
      } else {
        setError('Error sending password reset email.');
      }
      console.error('Error sending password reset email: ', error);
    }
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-500">{error}</p>}
              {emailSent && <p className="text-green-500">Email sent!</p>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset password
                </button>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Remember your password?{' '}
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Log in
                </a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
