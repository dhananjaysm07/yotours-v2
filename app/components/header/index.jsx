'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainMenu from '@components/header/MainMenu';
import MobileMenu from '@components/header/MobileMenu';
import Image from 'next/image';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => setNavbar(window.scrollY >= 10);

  useEffect(() => window.addEventListener('scroll', changeBackground), []);

  return (
    <>
      <header
        className={`header ${navbar ? 'is-sticky' : ''}`}
        style={{ background: navbar ? '#C9305F' : '' }}
      >
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <Image
                    src="/img/general/yotours.webp"
                    width={128}
                    height={128}
                    style={{ maxHeight: '50px', width: 'auto' }}
                    alt="logo icon"
                  />
                </Link>
                <span className="text-white fw-500 mr-10 text-30">
                  Yo Tours
                </span>
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
                      tabIndex="-1"
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
    </>
  );
};

export default Header;
