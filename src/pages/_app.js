import { useRouter } from "next/router"; // Import useRouter
import "../styles/globals.css";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import PopupForm from "../../components/PopupForm";
import PopupManager from "../../components/PopupManager";
import Navbar from "../../components/Navbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter(); // Initialize useRouter

  // Check if the current route is under the /admin folder
  const isAdminRoute = router.pathname.startsWith("/admin");

  // Check if the current route is the login page
  const isLoginRoute = router.pathname === "/login";

  // Determine if Breadcrumbs, PopupManager, and PopupForm should be rendered
  const shouldRenderAdditionalComponents = !isAdminRoute && !isLoginRoute;

  return (
    <div>
      {/* Conditionally render Breadcrumbs */}
      {shouldRenderAdditionalComponents && <Breadcrumbs />}

      {/* Conditionally render PopupManager and PopupForm */}
      {shouldRenderAdditionalComponents && (
        <>
          <PopupManager />
          <PopupForm />
        </>
      )}

      {/* Conditionally render Navbar */}
      {!isAdminRoute && <Navbar />}

      {/* Main Page Content */}
      <Component {...pageProps} />

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default MyApp;
