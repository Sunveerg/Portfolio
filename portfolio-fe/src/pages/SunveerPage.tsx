import SunveerList from '../features/SunveerList';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function SunveerPage(): JSX.Element {
  return (
    <div>
        <NavBar />
      <SunveerList />
        <Footer />
    </div>
  );
}
