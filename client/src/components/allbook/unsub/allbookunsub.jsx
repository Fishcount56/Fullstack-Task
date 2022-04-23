import React, { useEffect, useState } from "react";
import styleCSS from './allbookunsub.module.css'
import { API } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ReactPaginate from 'react-paginate';
import { Modal } from "react-bootstrap";

const AllBookUnSub = () => {
    const navigate = useNavigate()
    const [showNotification, setshowNotification] = useState(false)
    const closeNotification = () => {
        setshowNotification(!showNotification)
    }
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
                    <img src={item.bookCover} onClick={() => setshowNotification(!showNotification)}/>
                    <p className={styleCSS.bookTitle}>{item.title}</p>
                    <p className={styleCSS.bookAuthor}>{item.author}</p>
                    <div>
                        <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={showNotification}
                        onHide={closeNotification}
                        >
                        <Modal.Body>
                            <p className={styleCSS.notificationBody}>please make a payment to read the latest books</p>                    
                        </Modal.Body>
                        </Modal>
                    </div>
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

export default AllBookUnSub