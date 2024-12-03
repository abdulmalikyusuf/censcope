import Banner from "@/components/landing/banner";
import Commit from "@/components/landing/commit";
import Support from "@/components/landing/support";
import Actions from "@/components/landing/actions";
import Discover from "@/components/landing/discover";
import Newsline from "@/components/landing/newsline";
import SocialMedia from "@/components/landing/socialmedia";

export default function Page() {
    return (
        <>
            <Banner />
            <Newsline />
            <Support />
            <Actions />
            <Discover />
            <Commit />
            <SocialMedia />
        </>
    );
}
