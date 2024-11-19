import Image from "next/image";

export function Logo() {
  return (
    <div className="flex justify-center">
      <div className="w-full mx-3 py-3 flex gap-2">
        <Image
          src="./logo.svg"
          alt="logo"
          width={50}
          height={50}
        />
        <div className="flex items-center justify-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 ">
          <h1>Brainstormer</h1>
        </div>
      </div>
    </div>
  )
}