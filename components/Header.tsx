import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  bgCol?: string;
}

function Header(props: Props) {
  const [clientYposition, setClientYposition] = React.useState(false);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        window.scrollY > 300
          ? setClientYposition(true)
          : setClientYposition(false);
      },
      false
    );

    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY > 300
          ? setClientYposition(true)
          : setClientYposition(false);
      });
    };
  }, []);

  
  return (
    <header
      className={`${
        clientYposition ? `bg-white ` : props.bgCol || `bg-yellow-500`
      } p-5 mx-auto transition-all sticky top-0 duration-1000`}
    >
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link href="/">
          <img
            className="w-44 cursor-pointer pl-5"
            src="https://links.papareact.com/yvf"
            alt="medium logo"
          />
        </Link>
        <div className="flex items-center space-x-5">
          <ul className="hidden md:inline-flex items-center space-x-5 text-sm ">
            <li>Our story</li>
            <li>Membership</li>
            <li>Write</li>
            <li>Sign In</li>
            <li className="border px-4 py-2 text-white bg-black border-none rounded-full">
              Get Started
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
