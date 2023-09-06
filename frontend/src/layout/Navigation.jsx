//External Lib Import
import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser } from 'react-icons/ai';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

//Internal Lib Import
import Logo from '../assets/images/logo.png';
import { useProfileDetailsQuery } from '../redux/services/profileService';
import defaultUserAvatar from '../assets/images/user.png';
import { setLogout } from '../redux/slice/authReducer';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/languageDropdown';

const Navigation = ({ openMenu, setOpenMenu, title = 'Home' }) => {
  const { t } = useTranslation();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { accessToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const FullScreen = () => {
    if (isFullScreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  const { data: profileDetails } = useProfileDetailsQuery();

  return (
    <>
      <title>{title}</title>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <button className="icon-nav m-0 h5 btn btn-link" onClick={() => setOpenMenu(!openMenu)}>
              <AiOutlineMenuUnfold />
            </button>
            <Link to="/">
              <img className="nav-logo mx-2" src={Logo} alt="logo" />
            </Link>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <div>
              <LanguageDropdown />
            </div>
            <button className="mx-2 icon-nav h6 px-3 btn btn-link" onClick={FullScreen}>
              <BsArrowsFullscreen />
            </button>

            {accessToken && profileDetails && (
              <div className="user-dropdown">
                <img
                  className="icon-nav-img icon-nav"
                  src={profileDetails?.data?.image || defaultUserAvatar}
                  alt={profileDetails?.data?.email}
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                <div className={openDropdown ? 'user-dropdown-content d-block' : 'user-dropdown-content'}>
                  <div className="mt-4 text-center">
                    <img
                      className="icon-nav-img"
                      src={profileDetails?.data?.image || defaultUserAvatar}
                      alt={profileDetails?.data?.email}
                    />
                    <br />
                    <span>{profileDetails?.data?.role}</span>
                    <h6>{profileDetails?.data?.name}</h6>
                    <hr className="user-dropdown-divider  p-0" />
                  </div>
                  <NavLink to="/profile" className={({ isActive }) => (isActive ? 'link-item-active' : 'link-item')}>
                    <AiOutlineUser className="link-item-icon" />
                    <span className="link-item-caption">{t('profile')}</span>
                  </NavLink>
                  <span onClick={() => dispatch(setLogout())} className="link-item" style={{ cursor: 'pointer' }}>
                    <AiOutlineLogout className="link-item-icon" />
                    <span className="link-item-caption">{t('logout')}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
