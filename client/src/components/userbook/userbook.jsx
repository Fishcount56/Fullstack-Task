import React, { useState, useEffect, useContext } from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import book1 from "../../assets/book1.png"
import styleCSS from "./userbook.module.css"
import { useNavigate } from "react-router-dom";

const UserBook = () => {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    let id = state.user.id

    const [book, setBook] = useState({})
    const getBookList = async(id) => {
        try{
            const response = await API.get('/booklists')
            setBook (response.data.UserBooksList)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getBookList(id)
    }, [])

    return (
        <div className={styleCSS.bookList}>
            {book?.map ((item, index) => (
                <div className={styleCSS.userbooksection}>
                    <img src={book1} />
                    <p className={styleCSS.ownedbooktitle}>{item.BookOwned.title}</p>
                    <p className={styleCSS.ownedbookauthor}>{item.BookOwned.author}</p>
                </div>
            ))}
        </div>
    )
}

export default UserBook