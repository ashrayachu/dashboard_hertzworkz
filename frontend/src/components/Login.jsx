import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Move useNavigate to the top
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import ErrorAlert from './ErrorAlert';
import { validateEmail, validatePassword } from '../utlis/validation';
import Cookies from 'js-cookie'; // Import js-cookie
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Validate the form whenever inputs change
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setIsFormValid(!emailError && !passwordError);
  }, [email, password]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set all fields as touched to show validation errors
    setTouched({
      email: true,
      password: true,
    });

    if (!isFormValid) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This would connect to your Node.js backend
      const response = await fetch('https://dashboard-api-7vei.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error('Login failed');
        throw new Error(data.message || 'Login failed');
      }
      console.log("data", data);

      Cookies.set('token', data.accessToken);

      // Redirect to dashboard or home page
      toast.success("login  successful");
      navigate('/dashboard'); // Use navigate for redirection

    } catch (err) {
      toast.error('Login failed. Please try again.');
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Please sign in to your account">
      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="email"
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="you@example.com"
          required
          error={touched.email ? errors.email : ''}
        />

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            className={`w-full px-4 py-2 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="••••••••"
            required
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <SubmitButton
          loading={loading}
          text="Sign In"
          loadingText="Signing in..."
          disabled={!isFormValid}
        />
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;