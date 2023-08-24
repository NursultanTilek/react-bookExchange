import { React, useState } from "react";
import "./Header.scss";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-container">
        <div className="header__logo">
<<<<<<< HEAD
          <img src={images.logo} alt="Logo" />
=======
          <img src={images.logo} onClick={() => navigate("/")} />
>>>>>>> layout
        </div>
        <div className="header__search">
          <form>
            <input
              type="text"
              placeholder="Поиск Книги по автору, названию или жанру"
            />
            <button type="header__search-button">
              <BiSearchAlt2 className="search-icon" />
            </button>
          </form>
        </div>

        <div className="header__navbar-user">
          {toggleMenu ? (
            <AiOutlineClose
              className="header-icons profile"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <BiMenu
              className="header-icons profile"
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </div>

      {toggleMenu && (
        <div className="header__navbar">
          <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
