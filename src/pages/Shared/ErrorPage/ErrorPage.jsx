import React from 'react';
import { useRouteError } from 'react-router';
import { Link } from 'react-router-dom';
import notFoundImg from '../../../assets/images/Gif/not found think.gif';
import './ErrorPage.css'
const ErrorPage = () => {
    const error = useRouteError();
    const sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: `url(${notFoundImg})`, // Fix for setting background image
        backgroundSize: 'cover', // Optional: specify background size
        backgroundPosition: 'center' // Optional: specify background position
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen w-screen max-w-5xl mx-auto bg-error-image">
                <div className="grid h-screen md:place-content-center px-4 " >
                    <div className="text-center">
                        <h1 className="text-9xl font-black text-gray-200">{error?.status || 404}</h1>
                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                        <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
                        <Link to='/' className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
