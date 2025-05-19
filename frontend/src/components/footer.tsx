import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#29283a] py-2 w-full">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-300">
        ©{new Date().getFullYear()} Eventlify. All rights reserved.
      </div>
    </footer>
  );
}
