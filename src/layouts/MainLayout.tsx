import { Outlet } from "react-router-dom";
import Footer from "../components/Navigation/Footer";
import Navbar from "../components/Navigation/Navbar";

// The footer stays at the bottom even on short pages
const styles = `
.gh-mainlayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.gh-mainlayout__main {
  flex: 1;
}
`;

function MainLayout() {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-mainlayout">
        <Navbar />
        <main className="gh-mainlayout__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;