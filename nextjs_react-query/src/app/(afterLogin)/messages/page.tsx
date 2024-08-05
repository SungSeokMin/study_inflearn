import Room from './_component/Room';
import style from './message.module.css';

type Props = {};

const MessagesPage = ({}: Props) => {
	return (
		<main className={style.main}>
			<div className={style.header}>
				<h3>쪽지</h3>
			</div>
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
		</main>
	);
};

export default MessagesPage;
