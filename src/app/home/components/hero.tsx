"use client";


export function Hero() {
  return (
    <>
      <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-green-100">
        <div className="containerpx-4 md:px-6   flex-col space-y-2 items-center   ">
          <h1 className="text-3xl  text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800">
            Your Family's Perfect Getaway
          </h1>
          <p className="max-w-[600px] text-center text-green-700 md:text-xl">
            Create unforgettable memories with fun-filled activities for all
            ages.
          </p>
        </div>
      </section>
    </>
  );
}
