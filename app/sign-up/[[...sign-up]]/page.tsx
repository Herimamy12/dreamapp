import { SignUp } from '@clerk/nextjs'
import imgDreamapp from "@/app/assets/dream.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src={imgDreamapp}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to dream<span className="text-info">app</span>
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Let's go if you are ready.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-20 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to dream<span className="text-info">app</span>
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Let's go if you are ready.
              </p>
            </div>

            <div className="mt-10">
              <SignUp />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
