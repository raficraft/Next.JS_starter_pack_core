import "./../Sass/engine.scss";
import AuthProvider from "../engine/context/auth/AuthProvider";
import LanguageProvider from "../engine/context/language/LanguageContext";
import ModalProvider from "../engine/context/modal/ModalProvider";
import DashboardProvider from "../engine/context/Admin/DashboardContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ModalProvider>
          <DashboardProvider>
            <Component {...pageProps} />
          </DashboardProvider>
        </ModalProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default MyApp;
