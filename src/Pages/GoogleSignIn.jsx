import React, { useState } from 'react';
import { X, Smartphone } from 'lucide-react';
import guitar from '../assets/header/loginEntryPointPost.webp'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../store/FirebaseContext';

const GoogleSignIn = ({ onClose }) => {
    const navigate = useNavigate()
    const {googleSignIn} = useFirebase()
    const [error, setError] = useState('')

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await googleSignIn();
            onClose();
            navigate('/');
        } catch (error) {
            setError('Failed to Sign In with Google. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                {/* Close button */}
                <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                <X size={20} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                <div className="w-28 rounded-full flex items-center justify-center">
                    <img src={guitar} alt="" />
                </div>
                </div>

                {/* Header */}
                <h2 className="text-lg font-semibold text-center text-[rgba(0,47,52,1)] mb-6">
                Help us become one of the safest places to buy and sell
                </h2>

                {/* Progress dots */}
                <div className="flex justify-center space-x-2 mb-8">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>

                {/* Phone button */}
                <button className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                <Smartphone />
                <span className="text-gray-700">Continue with phone</span>
                </button>

                {/* Google button */}
                <button onClick={handleGoogleSignIn} className="w-full border border-gray-300 rounded-lg py-3 px-4 mb-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                </svg>
                <span className="text-gray-700">Continue with Google</span>
                </button>

                {error && <p className='text-red-500 text-xs my-2 text-center' >{error}</p>}

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-4">
                <div className="bg-white px-4 text-sm text-black font-bold">OR</div>
                </div>

                {/* Email button */}
                <button onClick={()=>{
                    onClose();
                    navigate('/login')
                }} className="w-full font-bold text-black rounded-lg py-3 px-4 underline transition-colors">
                Login with Email
                </button>

                {/* Footer text */}
                <p className="text-xs text-gray-500 text-center mt-32">
                All your personal details are safe with us.
                </p>
                <p className="text-xs text-gray-500 text-center mt-6">
                By continuing, you agree to our Terms and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default GoogleSignIn;