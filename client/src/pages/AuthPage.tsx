import { Route, Routes } from "react-router-dom";
import img from "../assets/auth-bg.png";
import { Signup, Login } from "../components/auth";

const AuthPage = () => {
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="h-1/3 bg-black relative">
        <img
          src={img}
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {/* <img src="/logo.svg" alt="Logo" className="h-12 w-12" /> */}
              <h1 className="text-white text-3xl font-bold">MusicApp</h1>
            </div>
            <p className="text-white text-xl max-w-lg px-4">
              Discover and share your favorite music with friends. Join our
              community of music lovers today.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="" element={<Signup />} />
      </Routes>
      
    </div>
  );
};

export default AuthPage;
