import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from '../assets/Modal.module.css';
const Backdrop = props =>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const Modal = props =>{
    const helper = document.getElementById("overlays");
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,helper)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,helper)}
        </Fragment>

    );
}
export default Modal;