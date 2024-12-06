import { SignInButton } from "@clerk/clerk-react";
import Image from "next/image";

export function SignIn() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-indigo-50">
      <div
        className="flex items-center justify-center drop-shadow-md 
      rounded-lg bg-white w-[400px] h-[300px]"
      >
        <div
          className="w-1/2 h-full bg-slate-50 flex flex-col items-center 
        justify-center rounded-lg"
        >
          <Image
            src="/logo.svg"
            alt="signin"
            width={100}
            height={100}
            className="mb-3"
          />
          <h1 className="text-slate-600 py-1.5">おかえりなさい</h1>
          <h1 className="text-xl font-bold">Brainstormer</h1>
        </div>
        <div className="w-1/2">
          <div className="flex items-center justify-center">
            <div className="bg-blue-600 rounded-md drop-shadow-md px-6 py-1.5 hover:bg-blue-500 transition-all">
              <p className="text-white">
                <SignInButton mode="modal"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
