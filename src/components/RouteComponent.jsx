import React from "react";
import SignUpForm from "../pages/Auth/components/SignUpForm/SignUpForm";
import LoginForm from "../pages/Auth/components/LoginForm/LoginForm";
import { Suspense, useEffect, useState } from "react";
import { ROUTES } from "../constants/routes";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import PageLoader from "./PageLoader/PageLoader";
import { Route, Routes, useLocation } from "react-router-dom";
// import "./pages/Auth/Auth.scss";
import RequestModel from "../pages/Requests/components/RequestModel/RequestModel";
import MyRequestModel from "../pages/Requests/components/MyRequestModel/MyRequestModel";

const routeComponent = () => {
  const location = useLocation();

  const FakeAsyncComponent = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2100);
      return () => clearTimeout(timer);
    }, []);

    return loading ? (
      <div className="loader">
        <PageLoader />
      </div>
    ) : (
      children
    );
  };

  const filteredRoutes = ROUTES.filter(
    (route) => route.link !== "*" || route.link !== "/auth"
  );
  const isRouteExists = filteredRoutes.some(
    (route) => route.link === location.pathname
  );

  const isBookInfoRoute = /^\/book-info\/\d+$/;
  const shouldShowHeaderFooter = isBookInfoRoute.test(location.pathname);

  const isSubMainPageRoute = /^\/submain-page\/[^/]+$/;
  const shouldShow = isSubMainPageRoute.test(location.pathname);

  const isBookEditRoute = /^\/edit-book\/\d+$/;
  const showHeaderFooter = isBookEditRoute.test(location.pathname);

  return (
    <div>
      <Suspense
        fallback={
          <div className="loader">
            <PageLoader />
          </div>
        }
      >
        <FakeAsyncComponent>
          {shouldShowHeaderFooter ||
          isRouteExists ||
          shouldShow ||
          showHeaderFooter ? (
            <Header />
          ) : null}

          <Routes className={""}>
            {ROUTES.map((page) =>
              page.link === "/auth" ? (
                <Route
                  path={page.link}
                  element={<page.component />}
                  key={page.id}
                >
                  <Route path="login" element={<LoginForm />} />
                  <Route path="sign-up" element={<SignUpForm />} />
                </Route>
              ) : page.link === "/requests" ? (
                <Route
                  path={page.link}
                  element={<page.component />}
                  key={page.id}
                >
                  <Route path="request-model" element={<RequestModel />} />
                  <Route path="myrequest-model" element={<MyRequestModel />} />
                </Route>
              ) : (
                <Route
                  path={page.link}
                  element={<page.component />}
                  key={page.id}
                />
              )
            )}
          </Routes>

          {shouldShowHeaderFooter ||
          isRouteExists ||
          shouldShow ||
          showHeaderFooter ? (
            <Footer />
          ) : null}
        </FakeAsyncComponent>
      </Suspense>
    </div>
  );
};

export default routeComponent;
   