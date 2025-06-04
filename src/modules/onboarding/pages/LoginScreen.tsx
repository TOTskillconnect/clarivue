import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { OAuthButton } from '../components/OAuthButton';

export const LoginScreen: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <OAuthButton />
    </div>
  );
}; 