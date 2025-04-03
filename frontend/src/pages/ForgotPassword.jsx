import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import axios from 'axios';
import { validateEmail } from '../utlis/validation';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const error = validateEmail(email);
    setEmailError(error);
    setIsFormValid(!error && oldPassword.trim() !== '' && newPassword.trim() !== '');
  }, [email, oldPassword, newPassword]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('https://dashboard-api-7vei.onrender.com/api/user/update-password', {
        email,
        oldPassword,
        newPassword
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your details to reset your password">
      {error && <ErrorAlert message={error} />}
      {success && <p className="text-green-600 text-center font-medium">Password changed successfully!</p>}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          placeholder="you@example.com"
          required
          error={touched ? emailError : ''}
        />
        <InputField
          id="oldPassword"
          type="password"
          label="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Enter old password"
          required
        />
        <InputField
          id="newPassword"
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />

        <SubmitButton 
          loading={loading} 
          text="Reset Password" 
          loadingText="Processing..." 
          disabled={!isFormValid}
        />
      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
