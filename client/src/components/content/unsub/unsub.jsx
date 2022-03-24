import React, { useState } from "react";
import styleCSS from "./unsub.module.css"
import book5 from "../../../assets/book5.png"
import book1 from "../../../assets/book1.png"
import book2 from "../../../assets/book2.png"
import book3 from "../../../assets/book3.png"
import book4 from "../../../assets/book4.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Modal } from "react-bootstrap";

const UnSubContent = () => {
    const [showNotification, setshowNotification] = useState(false)
    const closeNotification = () => {
        setshowNotification(!showNotification)
    }
    return (
        <div>
            <div className={styleCSS.firstSection}>
                <div className={styleCSS.leftSide}>
                    <p className={styleCSS.leftSideText}>subscribe now to access the entire book</p>
                </div>
                <div className={styleCSS.rightSide}>
                    <img src={book5} />
                </div>
            </div>
            <div className={styleCSS.secondSection}>
                <h1>List Book</h1>
                <div className={styleCSS.bookList}>
                    <div className={styleCSS.bookSection}>
                        <img onClick={() => setshowNotification(!showNotification)} src={book1} />
                        <p className={styleCSS.bookTitle}>Serangkai</p>
                        <p className={styleCSS.bookAuthor}>Valerie Patkar</p>
                    </div>
                    <div className={styleCSS.bookSection}>
                        <img onClick={() => setshowNotification(!showNotification)} src={book2} />
                        <p className={styleCSS.bookTitle}>Z1 - Sd/Mi Buku Siswa Tematik T...</p>
                        <p className={styleCSS.bookAuthor}>Afi Yustiyana</p>
                    </div>
                    <div className={styleCSS.bookSection}>
                        <img onClick={() => setshowNotification(!showNotification)} src={book3} />
                        <p className={styleCSS.bookTitle}>Kabar Rahasia Dari Alam Kubu ...</p>
                        <p className={styleCSS.bookAuthor}>DR. Kamil Yusuf Al-Atum</p>
                    </div>
                    <div className={styleCSS.bookSection}>
                        <img onClick={() => setshowNotification(!showNotification)} src={book4} />
                        <p className={styleCSS.bookTitle}>Tess on the Road</p>
                        <p className={styleCSS.bookAuthor}>Rachel Hartman</p>
                    </div>
                </div>
            </div>
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
    )
}

export default UnSubContent