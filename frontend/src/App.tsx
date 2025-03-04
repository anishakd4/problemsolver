import { useEffect } from "react";
import "./App.css";
import { SignIn } from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { userAtom } from "./store/atoms/user";
import { useAtom } from "jotai";

function App() {
  return <StoreApp />;
}

function StoreApp() {
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user && user.email) {
        setUser({ loading: false, user: { email: user.email } });
      } else {
        setUser({ loading: false });
        console.log("There is no logged in user");
      }
    });
  }, []);

  if (user.loading) {
    return <h1>Loading...</h1>;
  }

  if (!user.user) {
    return (
      <>
        <div>
          <SignIn />
        </div>
      </>
    );
  }
  return <>you are logged in as {user.user?.email}</>;
}

export default App;
