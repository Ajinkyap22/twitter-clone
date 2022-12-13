import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import UserOnboarding from "../../components/UserOnboarding/UserOnboarding";

const Feed = (): JSX.Element => {
  const [userOnboarding, setUserOnboarding] = useState<boolean>(true);

  return (
    <Container fluid>
      {/* sidebar */}

      {/* user onboaridng */}
      {userOnboarding && (
        <UserOnboarding setUserOnboarding={setUserOnboarding} />
      )}
    </Container>
  );
};

export default Feed;
