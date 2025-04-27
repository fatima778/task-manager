import React from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import TodoList from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
}

export default App;