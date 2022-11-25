import React from "react";

function Hero() {
  return (
    <div className="items-center justify-between bg-yellow-500 border-y border-black select-none">
      <div className="flex items-center max-w-7xl mx-auto justify-between"> 
        <div className="p-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with
            millions of readers.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium letter M logo"
        />
      </div>
    </div>
  );
}

export default Hero;
