import React, { useEffect, useState } from "react";
import styleCSS from './allbooksub.module.css'
import { API } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ReactPaginate from 'react-paginate';

const AllBookSub = () => {
    const navigate = useNavigate()
    const bookdetails = (bid) => {
        navigate('/bookinformation/' + bid)
    }

    const [book, setBook] = useState([])

    useEffect(() => {
        let isMount = false
        const getBook = async() => {
            try {
                const response = await API.get('/books')
                if (!isMount){
                    setBook(response.data.Book)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBook()
        return () => {
            isMount = true
        }
    }, [])

    const [pageNumber, setPageNumber] = useState(0)

    const bookPerPage = 2

    const pageNow = bookPerPage * pageNumber

    const renderBook = book
    .slice(pageNow, pageNow + bookPerPage)
    .map((item, index) => {
        return(
                <div className={styleCSS.bookSection} key={index}>
                    <img src={item.bookCover} onClick={() => bookdetails(item.id)}/>
                    <p className={styleCSS.bookTitle}>{item.title}</p>
                    <p className={styleCSS.bookAuthor}>{item.author}</p>
                </div>
        )
    })
  
    const PageCount = Math.ceil(book.length / bookPerPage)

    const pageChange = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <div>
            <div className={styleCSS.bookList}>
            {renderBook}
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={PageCount}
                onPageChange={pageChange}
                containerClassName={styleCSS.paginationBtns}
                previousLinkClassName={styleCSS.paginationPrevBtn}
                nextLinkClassName={styleCSS.paginationNextBtn}
                disabledLinkClassName={styleCSS.paginationDisabled}
                activeClassName={styleCSS.paginationActive}
            />
        </div>
    )
}

export default AllBookSub