import Projects from "../features/Projects";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


export default function ProjectsPage(): JSX.Element {
    return (
        <div>
            <NavBar />
            <Projects />
            <Footer />
        </div>
    );
}