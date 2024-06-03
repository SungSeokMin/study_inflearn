import styles from "./messages.module.css";
import MessageRoom from "@/app/(afterLogin)/messages/_component/MessageRoom";

interface Props {}

const MessagesPage = ({}: Props) => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h3>쪽지</h3>
      </div>

      <MessageRoom />
      <MessageRoom />
      <MessageRoom />
      <MessageRoom />
    </div>
  );
};

export default MessagesPage;
