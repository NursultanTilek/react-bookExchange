import React from "react";
import "./Account.scss";
import { images } from "../../constants/";
import Profcontainer from "../../components/Profcontainer/Profcontainer";

const Account = () => {
  return (
    <div className="account">
      <Profcontainer pageTitle="Аккаунт">
        <div className="account-container">
          <div className="account__left">
            <div className="account__left-user">
              <div className="user-img">
                <img src={images.profile} alt="icon of user medium size" />
              </div>
              <form>
                <label htmlFor="profile-picture">
                  Изменить фото
                  <input
                    id="profile-picture"
                    type="file"
                    name="file"
                    placeholder="tt"
                    className="file"
                  />
                </label>
              </form>
              <div className="account-info">
                <div className="blog">
                  <p>Имя пользователя</p>
                  <p className="blog-field">Максим</p>
                </div>

                <div className="blog">
                  <p>Пароль</p>
                  <p className="blog-field">*******911</p>
                </div>
                <div className="blog">
                  <p>Номер телефона</p>
                  <p className="blog-field">+996(555) 55-55-55</p>
                </div>
                <div className="blog">
                  <p>Электронная почта</p>
                  <p className="blog-field">@Maxim.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="account__right">
            <img src={images.account} alt="image of user account" />
          </div>
        </div>
      </Profcontainer>
    </div>
  );
};

export default Account;
