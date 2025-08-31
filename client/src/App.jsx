import Header from "./components/Header";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import useUserStore from "./lib/userStore";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import Share from "./pages/Share";
import Profile from "./pages/Profile";
import Learn from "./pages/Learn";

function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [setUser]);

  return (
    <> 
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/compiler" element={<Compiler/>}/>
          <Route path="/compiler/:id" element={<Compiler/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/share/:id" element={<Share />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </ThemeProvider>
    </>
  )
}

export default App;
