import React from // useState, useEffect
// ,useContext
'react';
import styles from '../assets/scss/globalStyle.module.scss';
import Head from 'next/head';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import { adresse } from '../../config';
// import { ThemeContext } from '../context/state';
// import fighter from '../assets/img/fighter.jpg';

const d = new Date();
const date = d.getFullYear();

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const loginData = {
  //     login: { url: '/login', link: 'Zaloguj' },
  //     signup: { url: '/signup', link: 'Dołącz' }
  // }
  // const { ctxUserAvatar } = useContext(ThemeContext);
  // const user = getUser();
  // const [login, setLogin] = useState({ url: '/login', link: 'Zaloguj' });
  // const [login2, setLogin2] = useState({ url: '/signup', link: 'Dołącz do gry' });
  // const [login3, setLogin3] = useState({ url: '/forgotPassword', link: "Zapomniałem hasła" });
  // const [login4, setLogin4] = useState({ url: '/map/ownmap', link: "Mapa świata" })

  return (
    <div>
      <Head>
        <title>Moontime</title>
        <meta name="description" content="Gra przeglądarkowa czas księżyca" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Czas księżyca</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Biblioteka</Nav.Link>
              <Nav.Link href="#deets">O grze</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Zaloguj</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className={styles.main}>{children}</main>

      <footer className={`${styles.footer} bg-body-tertiary`}>
        <p>
          Stworzone przez <a href="https://github.com/mhiho">MICA Michał Pełka</a>
        </p>
        <p>
          Wszelkie prawa zastrzeżone, Gdańsk <span>{date}</span>
        </p>
      </footer>
    </div>
  );
};
