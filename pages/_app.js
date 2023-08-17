import '@/styles/globals.css'
import '@/styles/navbar.css'
import '@/styles/cursor.css'
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";

export default function App({ Component, pageProps }) {

    useEffect(() => {
    AOS.init({
      // easing: "ease-out-cubic",
      // once: true,
      offset: 50,
      duration : 2000
    });
  }, []);


  return <Component {...pageProps} />
}
