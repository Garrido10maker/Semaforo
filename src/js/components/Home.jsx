import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [color, setColor] = useState("")
	const [isChanging, setIsChanging] = useState(false)

	const colors = [
		"red",
		"yellow",
		"green"
	]

	useEffect(() => {

		let intervalo;
		if (isChanging) {
			intervalo = setInterval(() => {
				setColor((prevColor) => {
					// Buscamos el índice del color actual
					const currentIndex = colors.indexOf(prevColor);
					// Calculamos el siguiente índice (si es el último, vuelve al 0)
					const nextIndex = (currentIndex + 1) % colors.length;
					return colors[nextIndex];
				});
			}, 2000); // Cambia cada 2 segundos
		}


		return () => clearInterval(intervalo);
	}, [isChanging]);



	function getColorBg(item) {
		if (item == "red") {
			return " bg-danger "
		}
		if (item == "yellow") {
			return " bg-warning "
		}
		if (item == "green") {
			return " bg-success "
		}
	}

	function isColorActive(item) {
		if (item == "red" && item == color) {
			return " turn-on-red "
		}
		if (item == "yellow" && item == color) {
			return " turn-on-yellow "
		}
		if (item == "green" && item == color) {
			return " turn-on-green "
		}
		return ""
	}


	return (
		<div className="d-flex flex-column align-items-center">
			<div className="bg-dark p-2" style={{ width: '5px', height: '40px' }}></div>
			<div className="d-inline-flex bg-dark rounded">
				<div className="d-flex flex-column align-items-center gap-2 p-2 ">
					{
						colors.map((item) => {
							return <div key={item}
								className={"rounded-circle p-5" + getColorBg(item) + isColorActive(item)}
								onClick={() => {
									item == color ? setColor("") : setColor(item)
								}}
							></div>
						})
					}

				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<button
						className={`m-5 btn ${isChanging ? "btn-danger" : "btn-success"}`}
						onClick={() => setIsChanging(!isChanging)}
					>
						{isChanging ? "Detener Auto" : "Iniciar Auto"}
					</button>

				</div>
			</div>

		</div>
	);
};

export default Home;
