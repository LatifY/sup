import React from "react";
import { FaSignOutAlt } from "react-icons/fa";


export default function SignInButton({ auth }) {
  const signOutWithGoogle = () => {
    auth.signOut()
  }

  return (
    <span class="sign-out" onClick={signOutWithGoogle}><FaSignOutAlt /></span>
  );
}
