import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Comment from "../components/common/comments/comment";
import FeedBackCard from "../components/common/feedbackCard";
import ModalWindow from "../components/ui/modalWindows/modalWindow";
import SpinnerComponent from "../components/ui/spinner";
import styles from "../scss/libs/commentsPage.module.scss";
import {
    getComments,
    loadCommentsList,
    removeComment
} from "../store/comments";
import { updateProduct } from "../store/products";
import { getUsersList, loadUsersList } from "../store/usersList";

const CommentsPage = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const { productId } = useParams();
    const usersList = useSelector(getUsersList());
    const dispatch = useDispatch();
    const comments = useSelector(getComments(productId));

    useEffect(() => {
        dispatch(loadCommentsList(productId));
        dispatch(loadUsersList());
    }, [dispatch]);

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id)).then(() => {
            const newComment = comments.filter((com) => com._id !== id);
            const updateData = {
                rating: isNaN(calculatingRatings(newComment))
                    ? 0
                    : calculatingRatings(newComment).toFixed(1),
                numReviews: comments.length - 1
            };

            dispatch(updateProduct(updateData, productId));
        });
    };

    function calculatingRatings(data) {
        return data.reduce((acc, i) => acc + i.estimation, 0) / data.length;
    }
    if (usersList && comments) {
        return (
            <div className={styles.commentsWrapper}>
                <div className={styles.commentsInput}>
                    <FeedBackCard
                        rating={
                            comments && calculatingRatings(comments).toFixed(1)
                        }
                        comments={comments.length}
                        setModalShow={setModalShow}
                    />
                    <ModalWindow
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                {comments.length !== 0 ? (
                    <div className={styles.commentsGroup}>
                        {comments &&
                            sortedComments.map((i) => (
                                <Comment
                                    userId={i.userId}
                                    onRemove={handleRemoveComment}
                                    _id={i._id}
                                    key={i._id}
                                    createdAt={i.created_at}
                                    name={
                                        usersList &&
                                        usersList.find(
                                            (user) => user._id === i.userId
                                        ).username
                                    }
                                    rating={i.estimation}
                                    content={i.content}
                                />
                            ))}
                    </div>
                ) : (
                    <div className={styles.commentsNo}>
                        <p>no comments</p>
                    </div>
                )}
            </div>
        );
    } else {
        return <SpinnerComponent />;
    }
};
export default CommentsPage;
