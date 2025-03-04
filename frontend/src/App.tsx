import { useEffect } from "react";
import "./App.css";
import { Landing } from "./components/Landing";
import { SignIn } from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      console.log({ user });
    });
  }, []);
  return (
    <>
      <div>
        <SignIn />
      </div>
    </>
  );
}

export default App;
