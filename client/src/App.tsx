import { useCallback, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage, HomePage } from "./pages";
import { getCookie } from "./utils";
import { useUserStore } from "./lib/stores";
import { getProfile } from "./api";
import "./App.css";

function App() {
  const cookie = getCookie("token");
  const { userState, setUser } = useUserStore();
  const dataFetchedRef = useRef(false);

  const handleUserAuthorization = useCallback(async () => {
    if (cookie) {
      // console.log("cookie exists");
      const userData = await getProfile();
      setUser({ userData, userLoading: false });
    } else {
      console.log("cookie does not exist");
    }
  }, [userState]);

  useEffect(() => {
    if (!dataFetchedRef.current) {    // check with useRef to prevent multiple calls by useEffect
      dataFetchedRef.current = true;
      handleUserAuthorization();
    }
  }, []); // useEffect dependency on auth state, which changes on login/logout

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
