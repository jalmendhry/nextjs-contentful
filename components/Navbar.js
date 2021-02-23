import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link href="/">
            <a className="navigation__link">Home</a>
          </Link>
        </li>
        <li className="navigation__item">
          <Link href="/about">
            <a className="navigation__link">About</a>
          </Link>
        </li>
        <li className="navigation__item">
          <Link href="/contact-us">
            <a className="navigation__link">Contact us</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
