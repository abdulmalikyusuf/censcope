import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full md:sticky md:bottom-0 flex flex-col">
            <nav className="w-full flex items-center capitalize text-white p-6 md:px-3xl font-titillium justify-around bg-cyan-600">
                <Link href="#" className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">
                    sitemap
                </Link>
                <Link href="#" className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">
                    legal notices
                </Link>
                <Link href="#" className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">
                    cookie policy
                </Link>
                <Link href="#" className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full">
                    contact us
                </Link>
            </nav>
        </footer>
    );
}
