import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorBoundary } from "react-error-boundary";

const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const FeedContent = lazy(() => import("./pages/FeedContent/FeedContent"));
const ErrorFalback = lazy(
  () => import("./components/ErrorFallback/ErrorFalback")
);

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

import "./App.scss";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFalback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* index */}
            <Route path="/" element={<Home />}>
              {/* feed */}
              <Route path="/home" element={<FeedContent />} />

              {/* profile */}
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
