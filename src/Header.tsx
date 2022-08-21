import React from 'react';
import logo from './assets/logo.png';

export function Header() {
  return (
    <header>
        <img src={logo} className="App-logo" alt="logo" />
        <link rel="icon" type="image/png" href={logo} />
      <p>
          Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </header>
  );
}