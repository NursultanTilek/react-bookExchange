import React, { useEffect, useState } from "react";
import Profcontainer from "../../components/Profcontainer/Profcontainer";
import { images } from "../../constants";
import "./Addbook.scss";
import { PiCaretRightBold } from "react-icons/pi";
import {
  useCreateBookMutation,
  // useCreateGenreMutation,
  // useGetGenresQuery,
} from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BOOKS } from "../../api/api";

const Addbook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    images: [],
    description: "",
    title: "",
    author: "",
    genre: "",
    language: 1,
    condition: 7,
    user_temp: localStorage.getItem('user')
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files) {
      const filesArray = [];

      for (const file of files) {
        filesArray.push(file);
      }

      setBookData((prevData) => ({
        ...prevData,
        images: filesArray,
      }));
    }
  };

  // const addBook = async (bookData) => {
  //   try {
  //     const response = await fetch(`${BOOKS}/books/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookData),
  //     });
  //     let data = await response.json();

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message);
  //     }
  //     return await response.json();
  //   } catch (e) {
  //     console.error("Error", e);
  //     throw e;
  //   }
  // };

  const handleNavigateAfterDelay = () => {
    setTimeout(() => {
      navigate("/submain-page");
    }, 4000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");

    let formField = new FormData();
    // formField.append('images', bookData.images);
    formField.append('description', bookData.description);
    formField.append('title', bookData.title);
    formField.append('author', bookData.author);
    formField.append('genre', bookData.genre);
    // formField.append('publishedYear', bookData.publishedYear);
    formField.append('language', bookData.language);
    formField.append('condition', bookData.condition);
    formField.append('user_temp', user);


    // if (
    //   !bookData.images.length ||
    //   !bookData.description ||
    //   !bookData.title ||
    //   !bookData.author ||
    //   !bookData.genre ||
    //   !bookData.publishedYear ||
    //   !bookData.language ||
    //   !bookData.condition
    // ) {
    //   toast.error("Заполните все поля!");
    //   return;
    // }

    // const newBook = {
    //   images: bookData.images,
    //   description: bookData.description,
    //   title: bookData.title,
    //   author: bookData.author,
    //   genre: bookData.genre,
    //   // publishedYear: bookData.publishedYear,
    //   language: bookData.language,
    //   condition: bookData.condition,
    //   user_temp: user
    // };



    // if (user) {
    //   newBook.user_temp = user;
    // }


    // try {
    //   // toast
    //   //   .promise(addBook(formField).unwrap(), {
    //   //     loading: "Загрузка...",
    //   //     success: () => {
    //   //       return <b>Книга успешно добавлена!</b>;
    //   //     },
    //   //     error: <b>Ошибка при добавлении книги!</b>,
    //   //   })
    //   //   .then(() => {
    //   //     toast("Вас перенаправит на главную страницу!", {
    //   //       icon: "🔄",
    //   //     });
    //   //     handleNavigateAfterDelay();
    //   //   });
    //   const data = await addBook(formField)


    //   toast('Success ', data)

    //   console.log(data)

    //   // setBookData({
    //   //   images: [],
    //   //   description: "",
    //   //   title: "",
    //   //   author: "",
    //   //   genre: 3,
    //   //   language: 2,
    //   //   condition: 7,
    //   //   user_temp: localStorage.getItem('user')
    //   // });
    // } catch (error) {
    //   alert("Ошибка при добавлении книги!");
    //   console.log("Ошибка при добавлении книги!", error);
    // }

    try {
      const response = await fetch(`${BOOKS}/books/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      console.log(bookData)
      let data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log(data)
      return data 
    } catch (e) {
      console.error("Error", e);
      throw e;
    }
  };

  return (
    <div>
      <Toaster containerStyle={{ backgroundColor: "transparent" }} />
      <Profcontainer
        pageTitle="Добавить книги"
        addBookTitle="Добавьте Книгу"
        addBookSubitle="Добавьте подробную информацию книги"
      >
        <div className="addBook">
          <div className="addBook-container">
            <div className="addBook__form">
              {/* <div className="addBook__cover">
                <p className="label">
                  Добавьте фото (не более 7){" "}
                  {bookData.images.length > 0 ? (
                    <span style={{ fontSize: "1.3rem" }}>
                      ДОБАВЛЕНО ({bookData.images.length})
                    </span>
                  ) : null}
                </p>
                <label htmlFor="add-picture">
                  <div className="add-picture">
                    <img src={images.img} />
                    <p className="add-picture__descr">Загрузите фотографии</p>
                    <input
                      name="images"
                      type="file"
                      id="add-picture"
                      className="add-file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                    />
                  </div>
                </label>
              </div> */}
              <div className="addBook__description">
                <label className="label">Добавьте описание</label>
                <textarea
                  placeholder="Введите описание книги"
                  className="addBook2__description-input"
                  name="description"
                  value={bookData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <label htmlFor="book-name">Название</label>
              <input
                type="text"
                id="book-name"
                placeholder="Введите название книги"
                name="title"
                value={bookData.title}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="book-author">Автор</label>
              <input
                type="text"
                id="book-author"
                placeholder="Введите имя автора книги"
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
                required
              />
              {/* <label htmlFor="book-published-year">Год издания</label>
              <input
                type="text"
                id="book-published-year"
                placeholder="Введите год издания книги"
                name="publishedYear"
                value={bookData.publishedYear}
                onChange={handleInputChange}
                required
              /> */}
              {/* <label htmlFor="book-language">Язык</label> */}

              {/* <select
                id="book-language"
                name="language"
                value={bookData.language}
                onChange={handleInputChange}
              >
                <option value="">Выберите язык</option>
                <option value="Английский">Английский</option>
                <option value="Русский">Русский</option>
                <option value="Кыргызский">Кыргызский</option>
                <option value="Турецкий">Турецкий</option>
                <option value="Казахский">Казахский</option>
                <option value="Итальянский">Итальянский</option>
                <option value="Немецкий">Немецкий</option>
              </select>

              <label htmlFor="book-genre">Жанр</label>
              <select
                id="book-genre"
                name="genre"
                value={bookData.genre}
                onChange={handleSelectChange}
              >
                <option value="">Выберите жанр</option>
                <option value="Роман">Роман</option>
                <option value="Фэнтези">Фэнтези</option>
                <option value="Приключение">Приключение</option>
                <option value="Детектив">Детектив</option>
                <option value="Научная фантастика">Научная фантастика</option>
                <option value="Ужасы">Ужасы</option>
                <option value="Исторический">Исторический</option>
                <option value="Комедия">Комедия</option>
                <option value="Драма">Драма</option>
                <option value="Биография">Биография</option>
                <option value="Саморазвитие">Саморазвитие</option>
                <option value="Поэзия">Поэзия</option>
              </select>
              <label htmlFor="book-condition">Состояние</label>
              <select
                id="book-condition"
                name="condition"
                value={bookData.condition}
                onChange={handleSelectChange}
              >
                <option value="">Выберите состояние</option>
                <option value="Хорошее">Хорошее состояние</option>
                <option value="Среднее">Среднее состояние</option>
                <option value="Плохое">Плохое состояние</option>
              </select> */}

              <div className="step-btn">
                <button
                  type="button"
                  className="next-link"
                  // disabled={isLoading}
                  onClick={handleFormSubmit}
                >
                  {isLoading ? "Загрузка..." : "Продолжить"}
                  <PiCaretRightBold className="next-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Profcontainer>
    </div>
  );
};

export default Addbook;
