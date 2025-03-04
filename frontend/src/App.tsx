import { useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { userAtom } from "./store/atoms/user";
import { useAtom } from "jotai";
import { Topbar } from "./components/Topbar";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import { About } from "./components/About";
import { Landing } from "./components/Landing";
import { Submissions } from "./components/Submissions";
import { ProblemList } from "./components/ProblemList";
import { Signin } from "./components/SignIn";

function App() {
  return <StoreApp />;
}

function StoreApp() {
  const [user, setUser] = useAtom(userAtom);

  const problemList = [
    { id: "1", problemName: "Two Sum", tags: ["Array", "Hash Table"] },
    { id: "2", problemName: "Reverse String", tags: ["String"] },
    { id: "3", problemName: "Palindrome Check", tags: ["String"] },
    { id: "4", problemName: "Merge Intervals", tags: ["Array", "Sorting"] },
  ];

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
          <Signin />
        </div>
      </>
    );
  }

  return (
    <div className="place-items-center grid">
      <div className="max-w-screen-lg w-full">
        <BrowserRouter>
          <Topbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/activity" element={<Submissions />} />
            <Route
              path="/problems"
              element={<ProblemList problemList={problemList} />}
            />
          </Routes>
        </BrowserRouter>
        {/* <Leaderboard /> */}
        {/* <Leaderboard leaderboard={leaderboardData} /> */}
      </div>
    </div>
  );
}

export default App;
