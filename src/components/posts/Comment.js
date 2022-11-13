import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const Comment = ({comment}) => {
    return (
        <li className="comments-box">
            <h6>
                {comment.email}
            </h6>
            <p>
                {comment.text}
            </p>
        </li>
    );
}