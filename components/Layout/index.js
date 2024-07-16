import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function Layout({ children, getRandomActivity }) {
  return (
    <>
      <Header getRandomActivity={getRandomActivity} />
      <main>{children}</main>
      <NavBar getRandomActivity={getRandomActivity} />
    </>
  );
}
