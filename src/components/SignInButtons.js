import React from "react";
import { toast } from "react-toastify";

export default function SignInButtons({ firebase, auth }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInTest = () => {
    toast.error("This feature is currently unavailable.");
  };

  return (
    <div className="auth-btns">
      <div class="auth-btn google-btn" onClick={signInWithGoogle}>
        <div class="auth-icon-wrapper">
          <img
            class="auth-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="auth-text">
          <b>Sign in with Google</b>
        </p>
      </div>

      <div class="auth-btn facebook-btn" onClick={signInTest}>
        <div class="auth-icon-wrapper">
          <img
            class="auth-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c2/20210305134841%21F_icon.svg"
          />
        </div>
        <p class="auth-text">
          <b>Sign in with Facebook</b>
        </p>
      </div>

      <div class="auth-btn apple-btn" onClick={signInTest}>
        <div class="auth-icon-wrapper">
          <img
            class="auth-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          />
        </div>
        <p class="auth-text">
          <b>Sign in with Apple</b>
        </p>
      </div>
    </div>
  );
}
