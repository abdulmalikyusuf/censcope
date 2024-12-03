import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function Layout(properties: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="w-full z-10 flex flex-col flex-none bg-white overflow-x-hidden">
        {properties.children}
      </main>
      <Footer />
    </>
  );
}
