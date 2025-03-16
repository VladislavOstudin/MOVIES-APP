import { useState } from 'react';

import './Header.css';

export default function Header() {
  const [now, setNow] = useState(new Date());

  setInterval(() => setNow(new Date()), 1000);

  return (
    <main>
        <div className="time">Time now: {now.toLocaleTimeString()}</div>
    </main>
  );
}
