import React, { useEffect } from "react";
import "./MessageModal.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "features/appConfig/appConfigSlice";

export default function MessageModal() {
    const modalIsShowing = useSelector(
        (state) => state.appConfig.modalIsShowing
    );
    const modalText = useSelector((state) => state.appConfig.modalText);
    const dispatch = useDispatch();

    useEffect(() => {
        let mytimeout;
        if (modalIsShowing) {
            mytimeout = setTimeout(() => dispatch(hideModal()), 5000);
            // clearTimeout(mytimeout);
        }

        return () => clearTimeout(mytimeout);
    }, [modalIsShowing]);

    if (!modalIsShowing) {
        return <></>;
    }

    return <div className="modal">{modalText || "Default Message"}</div>;
}
