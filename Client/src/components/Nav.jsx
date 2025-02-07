"use client";

import { Link, useLocation } from "react-router-dom";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "contato",
    path: "/contact",
  },
  {
    name: "cadastro",
    path: "/register",
  },
];

const Nav = () => {
  const location = useLocation();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            to={link.path}
            key={index}
            className={`${
              link.path === location.pathname &&
              "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
