import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Feed = lazy(() => import("./pages/Feed/Feed"));

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

import "./App.scss";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* index */}
          <Route path="/" element={<Home />} />

          {/* feed */}
          <Route path="/home" element={<Feed />} />

          {/* profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
