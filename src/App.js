import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS (includes Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './components/Homepage';
import NavBar from './components/NavBar';
import Benchmark from './components/Benchmark';
import Contact from './components/Contact'; 
import Builder from './components/Builder';
import PreBuilt from './components/Prebuilt';
import Parts from './components/Parts';
import SignUp from './components/SignUp'; 
import Login from './components/Login';
import ForgotPasswd from './components/ForgotPasswd';
import ChangePassword from './components/ChangePassword';
import CPU from './components/Parts/CPU';
import CPU_Cooler from './components/Parts/CPU_Cooler';
import GPU from './components/Parts/GPU';
import Motherboard from './components/Parts/Motherboard';
import RAM from './components/Parts/RAM';
import Storage from './components/Parts/Storage';
import PSU from './components/Parts/PSU';
import NetAdapter from './components/Parts/NetAdapter';
import OS from './components/Parts/OS';
import Desktop from './components/Prebuilt/Desktop';
import Laptop from './components/Prebuilt/Laptop';
import Footer from './components/Layout/Footer';
import Case from './components/Parts/Case';
import { AuthProvider } from './backend/Context/authContext';
import Admin from './components/AdminPage/admin';
import AdminCPU from 'components/AdminPage/AdminCPU';
import AdminGPU from 'components/AdminPage/AdminGPU';
import AdminMotherboard from 'components/AdminPage/AdminMotherboard';
import AdminRAM from 'components/AdminPage/AdminRAM';
import AdminPSU from 'components/AdminPage/AdminPSU';
import AdminNetAdapter from 'components/AdminPage/AdminNetAdapter';
import AdminStorage from 'components/AdminPage/AdminStorage';
import AdminCase from 'components/AdminPage/AdminCase';
import AdminUser from 'components/AdminPage/AdminUser';
import AdminCPUCooler from 'components/AdminPage/AdminCPUCooler';
import AdminOS from 'components/AdminPage/AdminOS';
import AdminLogin from 'components/AdminPage/AdminLogin';

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <RoutesWrapper />
      </Router>
    </AuthProvider>
  );
}

function RoutesWrapper() {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';
  const isLoginPage = location.pathname === '/login';
  const isForgotPasswdPage = location.pathname === '/forgotpasswd';
  const isChangePasswordPage = location.pathname.startsWith('/reset-password');  // Update this line
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isSignUpPage && !isLoginPage && !isForgotPasswdPage && !isChangePasswordPage  &&  !isAdminPage &&<NavBar />}
      {!isSignUpPage && !isLoginPage && !isForgotPasswdPage && !isChangePasswordPage  &&   !isAdminPage &&<Footer />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Builder" element={<Builder />} />
        <Route path="PreBuilt" element={<PreBuilt />} />
        <Route path="Parts" element={<Parts />} />
        <Route path="Benchmark" element={<Benchmark />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotpasswd" element={<ForgotPasswd />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} /> {/* Updated route */}
        <Route path="/CPU" element={<CPU />} />
        <Route path="/CPU_Cooler" element={<CPU_Cooler />} />
        <Route path="/GPU" element={<GPU />} />
        <Route path="/Motherboard" element={<Motherboard />} />
        <Route path="/RAM" element={<RAM />} />
        <Route path="/Storage" element={<Storage />} />
        <Route path="/PSU" element={<PSU />} />
        <Route path="/NetAdapter" element={<NetAdapter />} />
        <Route path="/OS" element={<OS />} />
        <Route path="/Desktop" element={<Desktop />} />
        <Route path="/Laptop" element={<Laptop />} />
        <Route path="/Case" element={<Case />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-cpu" element={<AdminCPU />} />
        <Route path="/admin-gpu" element={<AdminGPU />} />
        <Route path="/admin-motherboard" element={<AdminMotherboard />} />
        <Route path="/admin-ram" element={<AdminRAM />} />
        <Route path="/admin-psu" element={<AdminPSU />} />
        <Route path="/admin-netadapter" element={<AdminNetAdapter />} />
        <Route path="/admin-storage" element={<AdminStorage />} />
        <Route path="/admin-case" element={<AdminCase />} />
        <Route path="/admin-users" element={<AdminUser />} />
        <Route path="/admin-cpu-cooler" element={<AdminCPUCooler />} />
        <Route path="/admin-os" element={<AdminOS />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
