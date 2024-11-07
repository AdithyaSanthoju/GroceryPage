import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return email.endsWith('@gmail.com');
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        
        if (!isValidEmail(email)) {
            setMessage('Please enter a valid Gmail address.');
            toast.error('Please enter a valid Gmail address.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/create-account', {
                email,
                password,
                confirmPassword,
            });

            setMessage(response.data.message);
            toast.success('You are registered! OTP sent to your email.');
            setIsOtpSent(true); // Show OTP verification field
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', {
                email,
                otp,
            });

            setMessage(response.data.message);
            toast.success('OTP verified successfully! Please login.');

            // Navigate to the login page after successful OTP verification
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="create-account-container" style={{ marginTop: '200px' }}>
            <h2>{isOtpSent ? 'Verify OTP' : 'Create an Account'}</h2>
            {!isOtpSent ? (
                <form onSubmit={handleCreateAccount}>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm Password'
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'green' }}>Create Account</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            placeholder='Enter OTP'
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'green' }}>Verify OTP</button>
                </form>
            )}
            {message && <p>{message}</p>}
            <ToastContainer />
        </div>
    );
};

export default CreateAccount;
