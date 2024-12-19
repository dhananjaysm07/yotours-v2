'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProSidebarProvider, Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Social from '../common/social/Social';
import ContactInfo from './ContactInfo';
import Image from 'next/image';

const MobileMenu = () => {
  const path = usePathname();

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          <Image
            src="/img/general/yotours.webp"
            style={{ maxHeight: '50px', width: 'auto' }}
            alt="brand"
            width={128}
            height={128}
          />
        </Link>
        {/* End logo */}
        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <ProSidebarProvider>
        <Sidebar width="400" backgroundColor="#fff">
          <Menu>
            <MenuItem
              component={
                <Link
                  href="/"
                  className={path === '/' ? 'menu-active-link' : ''}
                />
              }
            >
              Home
            </MenuItem>

            <MenuItem
              component={
                <Link
                  href="/destinations"
                  className={path === '/destinations' ? 'menu-active-link' : ''}
                />
              }
            >
              Destinations
            </MenuItem>
            {/* End  Desitinations Menu */}

            <MenuItem
              component={
                <Link
                  href="/tours"
                  className={path === '/tours' ? 'menu-active-link' : ''}
                />
              }
            >
              Tours
            </MenuItem>

            <MenuItem
              component={
                <Link
                  href="/attractions"
                  className={path === '/attractions' ? 'menu-active-link' : ''}
                />
              }
            >
              Attraction Tickets
            </MenuItem>
            {/* End Contact  Menu */}
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
        {/* <div className="mt-20">
          <Link
            className=" button -dark-1 px-30 fw-400 text-14 bg-blue-1 h-50 text-white"
            href="/others-pages/login"
          >
            Become An Expert
          </Link>
        </div> */}
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
