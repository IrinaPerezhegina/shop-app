import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import styles from "../../../scss/components/modalOrder.module.scss";

function ModalOrder(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className={styles.modalOrderHeader}>Order information</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalOrderBody}>
                the order has been placed !
            </Modal.Body>
        </Modal>
    );
}
ModalOrder.propTypes = {
    onSubmit: PropTypes.string,
    onHide: PropTypes.func
};
export default ModalOrder;
