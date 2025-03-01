import Catalogue from "../components/catalogue";
import Contact from "../components/contact";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";

function Accueil() {
  
  return (
    <>
      <Header />
      <Hero />
      <div className="mx-5 px-5 bg-gray-200 mt-5">
        <h1 className="text-xl opacity-50 font-bold">Notre catalogue</h1>
      </div>
      <Catalogue />
      <Contact />
      <Footer />
    </>
  );
}

export default Accueil;
