import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '../src/context/state';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps}>
        <div id="modal-root"></div>
      </Component>
    </ThemeProvider>
  );
}

export default MyApp;
