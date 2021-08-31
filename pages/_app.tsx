import { Provider } from "next-auth/client";
import 'tailwindcss/tailwind.css'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider options={{ clientMaxAge: 0 }} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
