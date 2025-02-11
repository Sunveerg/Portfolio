import Comments from '../features/Comments';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function HomePage(): JSX.Element {
    return (
        <div>
            <NavBar />
            <Comments />
            <Footer />
        </div>
    );
}
