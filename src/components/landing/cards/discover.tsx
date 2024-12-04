import { FaArrowRight } from "react-icons/fa";

export default function DiscoverCard(props: { index: number, delay: number, visible: boolean, discover: DiscoverType }) {
    return <div style={{ transitionDelay: `${props.visible ? props.delay : 0}ms` }} className={`basis-48 flex items-center justify-center flex-none aspect-square bg-cyan-600 relative group transition-all duration-500 ${props.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <span className={`absolute h-full w-14 translate-y-6 ${props.index % 2 && 'rotate-45'} bg-inherit group-hover:brightness-110 transition-all before:h-full before:w-full before:bg-inherit before:absolute before:-left-full before:rotate-[15deg] after:h-4/5 after:w-full after:bg-inherit after:absolute after:left-full after:top-4`} />

        <div className="z-10 flex flex-col gap-4 text-white py-10 px-lg text-center justify-center h-full">
            <h3 className="text-4xl first-letter:capitalize">{props.discover.title}</h3>
            <p className="text-md first-letter:capitalize font-titillium">{props.discover.content}</p>
        </div>
    </div>
}