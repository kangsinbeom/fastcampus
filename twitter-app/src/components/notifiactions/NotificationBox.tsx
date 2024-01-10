import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useNavigate } from "react-router-dom";
import { NotificationProps } from "utils/type";
import s from "./Notification.module.scss";

const NotificationBox = ({
  notification,
}: {
  notification: NotificationProps;
}) => {
  const navigate = useNavigate();

  const onClickNotifiaction = async (url: string) => {
    const ref = doc(db, "notifications", notification.id);
    await updateDoc(ref, {
      isRead: true,
    });

    navigate(url);
  };
  return (
    <div className={s.notification}>
      <div onClick={() => onClickNotifiaction(notification.url)}>
        <div className={s.flex}>
          <div className={s.createdAt}>{notification.createdAt}</div>
          {notification.isRead === false && <div className={s.unread} />}
        </div>
        <div className="notifiaction__content">{notification.content}</div>
      </div>
    </div>
  );
};

export default NotificationBox;
