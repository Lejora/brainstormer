import Image from "next/image";

export function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center min-h-screen">
      <Image
        src="/logo.svg"
        alt="logo https://logoipsum.com/artwork/224"
        width={120}
        height={120}
        className=" animate-spin duration-700"
      />
    </div>
  )
}