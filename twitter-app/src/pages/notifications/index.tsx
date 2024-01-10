import NotificationBox from "components/notifiactions/NotificationBox";
import AuthContext from "contexts/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { NotificationProps } from "utils/type";

const NotificationsPage = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  useEffect(() => {
    if (user) {
      const ref = collection(db, "notifications");
      const notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createdAd", "desc")
      );
      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotifications(dataObj as NotificationProps[]);
      });
    }
  }, [user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Notification</div>
        </div>
      </div>
      <div className="post">
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <NotificationBox notification={noti} key={noti.id} />
          ))
        ) : (
          <div className="post__no-posts">
            <div className="post__text">알림이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
