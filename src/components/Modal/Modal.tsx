import React from 'react';
import {classes} from "mg-values";
import "./Modal.scss";
import {CSSTransition} from "react-transition-group";

interface Props extends React.HTMLProps<HTMLDivElement> {
    isActive? : boolean,
    setIsActive: (isActive: boolean) => void
}

function Modal({isActive, setIsActive, children, ...props}: Props) {
    let toBeClosed = false;

    function isModal(element: EventTarget) {
        const div = element as HTMLDivElement;
        return div.classList.contains("modal");
    }

    function onModalMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if (isModal(e.target)) {
            toBeClosed = true;
        }
    }

    function onModalMouseUp(e: React.MouseEvent<HTMLDivElement>) {
        if (toBeClosed) {
            if (isModal(e.target)) {
                setIsActive(false);
            }
            toBeClosed = false;
        }
    }

    return (
        //CSSTransition is not working
        <CSSTransition in={isActive === true} timeout={200} classNames="modal">
            <div className={classes({
                "active": () => isActive === true
            }, "modal")} {...props}
                 onMouseDown={onModalMouseDown}
                 onMouseUp={onModalMouseUp}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </CSSTransition>
    );
}

export default Modal;