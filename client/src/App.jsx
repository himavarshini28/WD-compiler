import Header from "./components/Header";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import useUserStore from "./lib/userStore";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import Share from "./pages/Share";
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
    
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/compiler" element={<Compiler/>}/>
          <Route path="/compiler/:id" element={<Compiler/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/learn" element={<Learn />} />
          <Route path="/share/:id" element={<Share />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
       
    </>
  )
}

export default App;
