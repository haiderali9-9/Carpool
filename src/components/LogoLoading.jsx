import * as React from "react";
import logo1 from '../assests/logo1.png'
function LogoLoading() {
  return (
    <main className="flex justify-center items-center px-16 py-20 mx-auto w-full h-screen text-5xl font-bold text-sky-400 bg-sky-100 tracking-[8px] max-md:px-5 max-md:text-4xl">
      <section className="flex flex-col mx-auto mt-24 max-w-full w-[428px] max-md:mt-10 max-md:text-4xl">
        <img
          loading="lazy"
          src={logo1}
          alt="Car Pool"
          className="mx-auto w-full aspect-[1.56] max-md:max-w-full"
        />
        <h1 className="self-center mt-14 max-md:mt-10 max-md:text-4xl">
          Car Pool
        </h1>
      </section>
    </main>
  );
}

export default LogoLoading;
