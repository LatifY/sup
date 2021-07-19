import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile({ auth }) {
  const [user] = useAuthState(auth);

  return (
    <div className="profile">
      <h3>{user.displayName}</h3>
      <svg
      className="pp"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="135%"
        height="135%"
        viewBox="0 0 250 250"
      >
        <defs>
          <mask id="msk1">
            <rect width="100%" height="100%" fill="black" />
            <circle
              cx="125"
              cy="125"
              r="100"
              fill="white"
              stroke-width="20"
              stroke="black"
            />
          </mask>
        </defs>

        <image
          xlinkHref={user.photoURL}
          x="23"
          y="23"
          width="80%"
          height="80%"
          mask="url(#msk1)"
        />

        <circle
          id="blue"
          cx="125"
          cy="125"
          r="100"
          fill="none"
          stroke="#4285F4"
          stroke-width="8"
          stroke-dasharray="183.2 445.1"
          stroke-dashoffset="78.54"
        />

        <circle
          id="red"
          cx="125"
          cy="125"
          r="100"
          fill="none"
          stroke="#EA4335"
          stroke-width="8"
          stroke-dasharray="203.3 425.1"
          stroke-dashoffset="281.9"
        />

        <circle
          id="gold"
          cx="125"
          cy="125"
          r="100"
          fill="none"
          stroke="#FABB04"
          stroke-width="8"
          stroke-dasharray="80 549.7"
          stroke-dashoffset="345	"
        />

        <circle
          id="green"
          cx="125"
          cy="125"
          r="100"
          fill="none"
          stroke="#34A852"
          stroke-width="8"
          stroke-dasharray="183.2 445.1"
          stroke-dashoffset="525.2	"
        />
      </svg>
    </div>
  );
}
