//External Lib Import
import { Container, Navbar } from 'react-bootstrap';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { Link } from 'react-router-dom';

//Internal Lib Import
import Logo from '../assets/images/logo.png';

const PublicNav = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <button className="icon-nav m-0 h5 btn btn-link">
              <AiOutlineMenuUnfold />
            </button>
            <Link to="/">
              <img className="nav-logo mx-2" src={Logo} alt="logo" />
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default PublicNav;
