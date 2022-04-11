import "./../Sass/engine.scss";
import AuthProvider from "../engine/context/auth/AuthProvider";
import LanguageProvider from "../engine/context/language/LanguageContext";
import ModalProvider from "../engine/context/modal/ModalProvider";
import DashboardProvider from "../engine/context/Admin/DashboardContext";
import Layout from "../engine/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ModalProvider>
          <DashboardProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DashboardProvider>
        </ModalProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default MyApp;
