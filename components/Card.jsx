const Card = ({ children }) => {
	return (
		<section className="mx-10 shadow focus:shadow-lg text-green-100 border-2 border-green-400 p-5 bg-green-400 rounded">
			{children}
		</section>
	);
};

export default Card;
