"use client"
import { cn } from "@/lib/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBar = () => {
    const pathname = usePathname()
    console.log(pathname)
    return <nav className="flex bg-white justify-between items-center w-full px-2 gap-2 rounded-t-xl border-t shadow-[-1px_-3px_10px_rgba(0,0,0,0.25)]">
        <Link className={cn("flex-1 text-center rounded-md py-4 text-xl font-bold", pathname === "/" && "text-brand")} href={"/"}>
            메뉴목록
        </Link>
        <Link className={cn("flex-1 text-center rounded-md py-4 text-xl font-bold", pathname === "/order" && "text-brand")} href={"/order"}>
            주문내역
        </Link>
    </nav>
}

export default NavBar