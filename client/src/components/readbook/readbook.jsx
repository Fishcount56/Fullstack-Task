import React, { useState, useEffect, useContext } from "react";
import styleCSS from "./readbook.module.css"
import { API } from "../../config/api";
import { ReactReader, ReactReaderStyle } from "react-reader"
import iconsm from "../../assets/iconsm.png"
import { useNavigate } from "react-router-dom";

const ReadBook = () => {
    const ownStyles = {
        ...ReactReaderStyle,
        readerArea: {
          ...ReactReaderStyle.readerArea,
          width: '90%',
          height: '90%',
          marginRight: 'auto',
          marginLeft: 'auto'
        },
        tocArea: {
            ...ReactReaderStyle.tocArea,
            height: '90%',
            marginLeft: '5%',
            marginTop: '7.7%',
          }
      }

    const navigate = useNavigate()
    const backtodashboard = () => {
        navigate('/dashboard')
    }
    return (
        <div className={styleCSS.readbookcontent}>
            <img src={iconsm} onClick={() => {backtodashboard()}}/>
            <div style={{ height: "100vh" }}>
            <ReactReader
                url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
                styles={ownStyles}
            />
            </div>
        </div>
    )
}

export default ReadBook