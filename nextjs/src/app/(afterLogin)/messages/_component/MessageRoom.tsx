"use client";

import { faker } from "@faker-js/faker";

import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import styles from "@/app/(afterLogin)/messages/messages.module.css";
import { useRouter } from "next/navigation";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {}

const MessageRoom = ({}: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };

  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      {
        roomId: 123,
        content: "안녕하세요",
        createdAt: new Date(),
      },
    ],
  };

  return (
    <div className={styles.room} onClickCapture={onClick}>
      <div className={styles.roomUserImage}>
        <img src={faker.image.avatar()} width={40} height={40} alt="room" />
      </div>

      <div className={styles.roomChatInfo}>
        <div className={styles.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp; · &nbsp;
          <span className={styles.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>

        <div className={styles.roomLastChat}>
          {user.Messages.at(-1)?.content}
        </div>
      </div>
    </div>
  );
};

export default MessageRoom;
