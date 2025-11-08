import s from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={s.container}>
			<div className={s.title}>Loading</div>
			<div className={s.loader} />
		</div>
	);
};

export default Loader;
