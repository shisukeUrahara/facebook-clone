import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div>
      {/* LEFT PORTION */}
      <div>
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
        ></Image>

        <div>
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>

      {/* CENTER PORTION */}

      {/* RIGHT PORTION */}
    </div>
  );
}

export default Header;
