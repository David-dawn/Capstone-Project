import "../styles/globals.css";
import Header from "../pages/components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
