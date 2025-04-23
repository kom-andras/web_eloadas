import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState("Még nem kattintottál");

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setText("Kattintottál!")}>Kattints rám</button>
    </div>
  );
}
