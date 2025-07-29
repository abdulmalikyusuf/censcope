import Link from "next/link";

import SubscribeForm from "@/components/forms/subscribe";
import Button from "@/components/primary/button";

export default function Footer() {
  return (
    <footer className="flex flex-col bg-gray-50">
      <div className="padding-horizontal padding-vertical">
        <div className="flex gap-4 lg:gap-6 items-center flex-col lg:flex-row bg-white">
          <div className="basis-80 relative flex flex-col p-2 items-start justify-center bg-cyan-600">
            <div className="z-10 flex flex-col gap-8 text-white py-3 px-6 justify-start h-full">
              <h3 className="heading-6 md:heading-4 first-letter:capitalize">
                CENSCOPE
              </h3>
              <p className="md:text-lg !leading-none font-titillium">
                2, rue Auguste Thomas 92600 Asnières-sur-Seine, France +33 (0)1
                55 66 99 66
              </p>

              <Button
                withIcon
                withShadow
                title="See all news"
                shadowClassName="bg-white"
                containerClassName="self-start border-2 border-current hover:border-transparent text-white hover:text-black"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 items-start text-sm lg:text-base !leading-snug">
            <p className="">
              Centre for Social Cohesion, Peace and Empowerment helps civilian
              victims, marginalized or excluded by the effects of conflict,
              climate related disasters and situations of economic collapse.
            </p>
            <p className="">
              Each year, Centre for Social Cohesion, Peace and Empowerment most
              of its resources to the programs it deploys in its various areas
              of intervention and only 0.2% to fundraising. Your donations are
              essential.
            </p>

            <p className="text-xs lg:text-sm !leading-none">
              Your email address is only used to send you The Centre for Social
              Cohesion, Peace and Empowerment newsletters. You can use the
              unsubscribe link integrated in the newsletter at any time.
            </p>
          </div>

          <SubscribeForm />
        </div>
      </div>

      <div className="w-full flex gap-4 lg:gap-6 flex-col md:flex-row py-4 lg:py-8 px-4 md:px-6 lg:px-10 bg-white justify-evenly">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-lg lg:text-xl">Get informed</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="flex flex-col relative">
              Contact us
            </Link>
            <Link href="#" className="flex flex-col relative">
              Press area
            </Link>
          </nav>
        </div>

        <div className="h-full w-0.5 bg-black/20 flex-none hidden md:flex" />

        <div className="flex flex-col gap-4 items-center md:items-start">
          <h3 className="text-lg lg:text-xl">Get involved</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="flex flex-col relative">
              Support our action
            </Link>
            <Link href="#" className="flex flex-col relative">
              Our job offers
            </Link>
          </nav>
        </div>
      </div>

      <nav className="w-full flex items-center capitalize text-white p-6 md:px-4% font-titillium justify-around bg-cyan-600">
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          sitemap
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          legal notices
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          cookie policy
        </Link>
        <Link
          href="#"
          className="flex flex-col relative after:h-0.5 after:bg-white after:w-0 after:transition-all hover:after:w-full"
        >
          contact us
        </Link>
      </nav>
    </footer>
  );
}
