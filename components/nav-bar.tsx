import Link from "next/link"

const NavBar = () => {
    return <nav className="flex justify-between items-center w-full px-2 gap-2 rounded-t-xl border-t shadow-[-1px_-3px_10px_rgba(0,0,0,0.25)]">
        <Link className="flex-1 text-center text-brand rounded-md py-4 text-xl font-bold" href={"#"}>
            메뉴목록
        </Link>
        <Link className="flex-1 text-center rounded-md py-4 text-xl font-bold" href={"#"}>
            주문내역
        </Link>
    </nav>
}

export default NavBar