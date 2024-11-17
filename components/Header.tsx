"use client"
import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
// import Button from "./Button"; // Leaving commented as per your request
// import useAuthModal from "@/hooks/useAuthModal"; // Leaving commented as per your request
//import { useSupabaseClient } from "@supabase/auth-helpers-react"
// import { useUser } from "@/hooks/useUser"; // Leaving commented as per your request
// import { FaUserAlt } from "react-icons/fa"; // Leaving commented as per your request
//import toast from "react-hot-toast"
import Image from "next/image"

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter()
  //const supabaseClient = useSupabaseClient()
  // const { user } = useUser(); // Leaving commented as per your request
  // const handleLogout = async () => { // Leaving commented as per your request
  //   const { error } = await supabaseClient.auth.signOut();
  //   router.refresh();
  //   if (error) {
  //     toast.error(error.message);
  //   } else {
  //     toast.success("Logged out");
  //   }
  // };

  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
        from-red-800
        p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="absolute right-4 mt-4 md:right-6 md:top-6">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="
            cursor-pointer 
            hover:opacity-80 
            transition-opacity duration-300
          "
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
