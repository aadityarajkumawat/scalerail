import Link from "next/link";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();
  const pathname = router.pathname;
  const isHome = pathname === "/";

  return (
    <div className={`${isHome ? "absolute z-50" : ""} w-full h-[80px] inset-0`}>
      <div className="w-full flex justify-between bg-transparent px-10 py-5">
        <div>
          <Link href="/">
            <img src="/logo.png" alt="scalerail" style={{ width: "40px" }} />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center justify-center text-lg gap-2">
            <li>
              <Link href="/">home</Link>
            </li>
            <li>|</li>
            <li>
              <Link href="/products">products</Link>
            </li>
            <li>|</li>
            <li>
              <Link href="/contact">contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
