'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MainMenu from './header/main-menu';
import MobileMenu from './header/mobile-menu';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => setNavbar(window.scrollY >= 10);

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  return (
    <header
      className="header"
      style={{
        background: navbar ? '#C9305F' : 'transparent',
        position: navbar ? 'sticky' : 'fixed',
        boxShadow: navbar ? '0 0 10px rgba(0, 0, 0, 0.1)' : '',
        margin: 0,
      }}
    >
      <div className="header__container px-30 sm:px-20">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              <Link href="/" className="header-logo mr-20">
                <Image
                  src="/img/general/yotours.webp"
                  width={64}
                  height={64}
                  priority
                  style={{ height: 48, width: 48 }}
                  alt="Yo Tours Logo Image"
                />
              </Link>
              <span className="text-white fw-500 mr-10 text-30">Yo Tours</span>
              <div className="header-menu">
                <div className="header-menu__content">
                  <MainMenu style="text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex items-center">
              <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                <Link
                  href="/others-pages/login"
                  className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                >
                  Work With Us
                </Link>
              </div>
              <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                <div>
                  <button
                    className="d-flex items-center icon-menu text-inherit text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  />

                  <div
                    className="offcanvas offcanvas-start mobile_menu-content "
                    tabIndex={-1}
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
