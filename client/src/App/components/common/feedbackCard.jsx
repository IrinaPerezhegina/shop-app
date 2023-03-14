import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import StarRatingStatic from "../ui/starRatingStatic.jsx";
import styles from "../../scss/libs/commentsPage.module.scss";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user.js";

const FeedBackCard = ({ setModalShow, comments, rating }) => {
    const CurrentUserAuth = useSelector(getIsLoggedIn());
    return (
        <Card>
            <Card.Header className={styles.feedBackTitle}>
                product reviews
            </Card.Header>
            <Card.Body>
                <Card.Title className={styles.feedBackСall}>
                    Every evaluation is important to us
                </Card.Title>
                <Card.Text>
                    <div className={styles.feedBackText}>
                        <StarRatingStatic rating={rating} />
                        <p>
                            {isNaN(rating) ? 0 : rating}({comments})
                        </p>
                    </div>
                    <span className={styles.feedBackAuth}>
                        only an authorized user can leave a review
                    </span>
                </Card.Text>
                <button
                    disabled={!CurrentUserAuth}
                    className={
                        CurrentUserAuth
                            ? styles.feedBackBtn
                            : styles.feedBackBtnDisabled
                    }
                    onClick={() => setModalShow(true)}
                >
                    leave a review
                </button>
            </Card.Body>
        </Card>
    );
};
FeedBackCard.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comments: PropTypes.number,
    setModalShow: PropTypes.func,
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default FeedBackCard;
