import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { Navbar } from "../components/Navbar";
import { Section } from "../components/Section";
import { Blog } from "../components/Blog";

export function Home() {
  return (
    <>
      <Navbar />
      <Section />
      <Blog />
    </>
  );
}
