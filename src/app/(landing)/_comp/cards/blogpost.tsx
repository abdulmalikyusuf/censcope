import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export default function BlogPostCard() {
    return <div className="aspect-square bg-gray-100">
        <Image alt="" width={500} height={500} src="/images/blog.jpeg" className="w-full h-2/3 bg-black" />

        <div className="flex flex-1 flex-col gap-4 p-4 py-8 items-start justify-center h-1/3">
            <div className="w-full flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Image alt="" width={500} height={500} src="/images/avatar.jpg" className="w-8 h-8 rounded-full bg-black" />
                    <span className="text-gray-500 capitalize text-md">john doe</span>
                </div>

                <span className="flex items-center gap-2 text-gray-500 capitalize text-md">
                    <SlCalender className="text-primary" /> 01 jan, 2045
                </span>
            </div>
            <h3 className="text-2xl font-bold uppercase">
                Rebum diam clita lorem erat magna est erat
            </h3>

            <Link href="#" className="text-primary hover:text-red-400 uppercase font-bold text-lg flex items-center gap-2">
                read more <FaArrowRightLong size={16} />
            </Link>
        </div>
    </div>
}