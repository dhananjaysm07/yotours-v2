'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MainMenu = ({ style = '' }) => {
  const path = usePathname();
  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <li className={`${path === '/' ? 'current' : ''} `}>
          <Link href="/">Home</Link>
        </li>
        <li className={path === '/destinations' ? 'current' : ''}>
          <Link href="/destinations">Destinations</Link>
        </li>
        <li className={path === '/tours' ? 'current' : ''}>
          <Link href="/tours">Tours</Link>
        </li>
        <li className={path === '/attractions' ? 'current' : ''}>
          <Link href="/attractions">Attraction Tickets</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
