// HOCs
import { withApollo } from "../hocs/apollo";

// Types
import { type AppProps } from "next/app";

// Styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withApollo()(MyApp);
