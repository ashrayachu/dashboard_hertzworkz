import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import ErrorAlert from './ErrorAlert';
import { validateEmail, validatePassword, validateName, validatePasswordMatch, validatePhone } from '../utlis/validation';
import { toast } from 'react-toastify';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validatePasswordMatch(password, confirmPassword);
    
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    
    setIsFormValid(!nameError && !emailError && !phoneError && !passwordError && !confirmPasswordError);
  }, [name, email, phone, password, confirmPassword]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
    
    if (!isFormValid) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://dashboard-api-7vei.onrender.com/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, mobileNumber:phone, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        toast.error('Signup failed');
        throw new Error(data.message || 'Signup failed');
      }
      toast.success('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error('Signup failed');
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Sign up for a new account">
      {error && <ErrorAlert message={error} />}
      
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="name"
          type="text"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="John Doe"
          required
          error={touched.name ? errors.name : ''}
        />
        
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
        
        <InputField
          id="phone"
          type="tel"
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => handleBlur('phone')}
          placeholder="9876543210"
          required
          error={touched.phone ? errors.phone : ''}
        />

        <InputField
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          placeholder="••••••••"
          required
          error={touched.password ? errors.password : ''}
        />
        
        <InputField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          placeholder="••••••••"
          required
          error={touched.confirmPassword ? errors.confirmPassword : ''}
        />
        
        <SubmitButton 
          loading={loading} 
          text="Create Account" 
          loadingText="Creating Account..." 
          disabled={!isFormValid}
        />
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Signup;