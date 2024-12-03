import { FaArrowRight } from "react-icons/fa";

export default function SupportCard(props: { index: number, delay: number, visible: boolean, support: SupportType }) {
    return <div style={{ transitionDelay: `${props.visible ? props.delay : 0}ms` }} className={`basis-80 flex items-center justify-center flex-none aspect-square ${props.support.bgColor} bg-opacity-90 hover:bg-opacity-100 odd:mb-20 even:mt-20 relative group transition-all duration-500 ${props.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <span className={`absolute h-full w-20 translate-y-6 ${props.index % 2 && 'rotate-45'} bg-inherit group-hover:brightness-110 transition-all before:h-full before:w-full before:bg-inherit before:absolute before:-left-full before:rotate-[15deg] after:h-4/5 after:w-full after:bg-inherit after:absolute after:left-full after:top-4`} />

        <div className="z-10 flex flex-col gap-4 text-white py-10 px-lg justify-start h-full">
            <h3 className="text-3xl font-bold first-letter:capitalize">{props.support.title} <span className="md:text-5xl">{props.support.titleHighlight}</span></h3>
            <p className="text-md first-letter:capitalize">{props.support.description}</p>

            <button className="mt-4 ">
                <span className="gap-2 flex items-center font-bold text-white first-letter:capitalize">
                    {props.support.buttonText} <FaArrowRight className=" transition-all group-hover:ml-2 group-hover:scale-110" />
                </span>
            </button>
        </div>
    </div>
}