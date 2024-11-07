import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../Login.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (showResetForm) {
            // Password reset form submission
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp, newPassword ,confirmNewPassword: confirmPassword}),
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success('Password reset successfully! You can now log in.');
                    setShowResetForm(false);
                    setOtpSent(false);
                    setOtpVerified(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setOtp('');
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            }
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userEmail', email);
                toast.success('You have successfully logged in!');
                onLogin(email);
                setTimeout(() => {
                    navigate('/', { state: { message: 'You have successfully logged in!' } });
                }, 2000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleSendOtp = async () => {
        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setOtpSent(true);
                toast.success('OTP sent to your email');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (response.ok) {
                setOtpVerified(true);
                toast.success('OTP verified. You may now reset your password.');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2>{showResetForm ? 'Reset Password' : 'Login to GROCERY'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email'
                        />
                    </div>

                    {!showResetForm ? (
                        <>
                            <div className="form-group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='Password'
                                />
                            </div>
                            <button type="submit" style={{ backgroundColor: 'green' }}>Login</button>
                            <p>
                                Forgot password?{' '}
                                <span
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                    onClick={() => setShowResetForm(true)}
                                >
                                    Reset here
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            {!otpSent ? (
                                <button type="button" onClick={handleSendOtp} style={{ backgroundColor: 'green' }}>
                                    Send OTP
                                </button>
                            ) : otpVerified ? (
                                <>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            placeholder='New Password'
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
                                    <button type="submit" style={{ backgroundColor: 'green' }}>Reset Password</button>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            placeholder='Enter OTP'
                                        />
                                    </div>
                                    <button type="button" onClick={handleVerifyOtp} style={{ backgroundColor: 'green' }}>
                                        Verify OTP
                                    </button>
                                </>
                            )}
                        </>
                    )}

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <p>
                        {!showResetForm && (
                            <>Don't have an account? <Link to="/CreateAccount">Create Account</Link></>
                        )}
                    </p>
                </form>
            </div>
            <ToastContainer /> {/* Toast container for notifications */}
        </div>
    );
};

export default LoginForm; 