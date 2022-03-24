import React, { useState, useContext, useEffect} from "react";
import UnSubNav from "./sidenav/unsub/unsubnav";
import SubNav from "./sidenav/sub/subnav";
import UnSubContent from "./content/unsub/unsub";
import './homepage.css'
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

const HomePage = () => {
    const isSubs = false
    const [state, dispatch] = useContext(UserContext)
    let id = state.user.id
    const [status, setStatus] = useState({})
    const checkPaymentStatus = async(id) => {
        try {
            const response = await API.get('/transaction')
            setStatus(response.data.Transaction.Transaction.paymentStatus)
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(() => {
        checkPaymentStatus(id);
      }, []);
    return (
        <div className="homepage-content">
            <div className="side-nav">
                {status == "Approve" ? <SubNav /> : <UnSubNav />}
            </div>
            <div className="page-content">
                <UnSubContent />
            </div>
        </div>
    )
}

export default HomePage