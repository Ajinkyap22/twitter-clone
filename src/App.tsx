import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.scss";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Routes>
        {/* index */}
        <Route path="/" element={<Home />} />

        {/* feed */}
        <Route path="/home" element={<Feed />} />

        {/* profile */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
