import React from "react";
import PropTypes from "prop-types";
import { dateСonverter } from "../../../utils/dateСonverter";
import Card from "react-bootstrap/Card";
import StarRatingStatic from "../../ui/starRatingStatic";
import styles from "../../../scss/libs/commentsPage.module.scss";
import localStorageService from "../../../service/localStorage.service";

const Comment = ({
    userId,
    name,
    createdAt,
    rating,
    content,
    onRemove,
    _id
}) => {
    return (
        <Card className={styles.commentCard}>
            <Card.Header className={styles.commentHeader}>
                {localStorageService.getUserId() === userId && (
                    <button
                        onClick={() => onRemove(_id)}
                        className={styles.commentDelete}
                    >
                        X
                    </button>
                )}
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        <b className={styles.commentName}>{name}</b>
                        <i className={styles.commentDate}>
                            {dateСonverter(createdAt)}
                        </i>
                        <StarRatingStatic rating={rating} />
                    </p>

                    <footer className="blockquote-footer">
                        <cite
                            title="Source Title"
                            className={styles.commentContent}
                        >
                            {content}
                        </cite>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
};
Comment.propTypes = {
    userId: PropTypes.string,
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    _id: PropTypes.string
};

export default Comment;
