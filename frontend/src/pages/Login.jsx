import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import { validateEmail, validatePassword } from '../utlis/validation';
import { loginUser } from '../services/authServices';
import { toast } from 'react-toastify';


import { jwtDecode } from 'jwt-decode';

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
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setIsFormValid(!emailError && !passwordError);
  }, [email, password]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid) return;
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      const token = data.accessToken;
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      const role = decoded.role; // Replace with actual role from decoded token
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
      toast.success('Login successful');

    } catch (err) {
      toast.error(err.message);
      setError(err.message);
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
        <SubmitButton loading={loading} text="Sign In" loadingText="Signing in..." disabled={!isFormValid} />
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
