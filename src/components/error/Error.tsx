import s from "./Error.module.css";

type ErrorProp = {
	message: string;
	onBack: () => void;
};

function ErrorBox({ message, onBack }: ErrorProp) {
	return (
		<div className={s.error}>
			<p>{message}</p>
			<button onClick={onBack}>Назад</button>
		</div>
	);
}
export default ErrorBox;
