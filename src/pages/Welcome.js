import React from 'react'
import SignInButtons from '../components/SignInButtons'

import pp from ".././assets/img/sup.png";

export default function Welcome({ firebase, auth }) {
  return (
    <>
      <div className="welcome">
        <img src={pp} className="welcome-logo" alt="logo"/>
        <h1 className="welcome-text-top">Bored? just say sup'</h1>
        <h1 className="welcome-text-bottom">Start Now!</h1>
        <SignInButtons firebase={firebase} auth={auth}/>
      </div>
    </>
  )
}
