
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SitePhoto } from "@/components/RoutePhoto";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="page-hero page-hero-fill">
      <Seo
        title="Page not found | Wild AI"
        description="That page is not on Wild AI."
        path="/404"
        noindex
      />
      <Navbar />
      <SitePhoto stem="2026-10-afterparty-04" />
      <div className="container relative mx-auto px-4 text-center">
        <p className="eyebrow mb-5 justify-center">Error 404</p>
        <h1 className="page-hero__title mb-4">
          Oops! Page <span>not found</span>
        </h1>
        <Link to="/" className="btn-primary mt-6">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
