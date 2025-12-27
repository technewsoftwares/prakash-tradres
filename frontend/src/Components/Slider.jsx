import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
	const responsive = {

		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	}
	return (
		<div className="relative overflow-hidden z-10">
			<Carousel
				responsive={responsive}
				showDots={true}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
			>
		
				<div><img src="https://i.ibb.co/MNVx1CC/slider2.jpg" alt="slider1" /></div>
				<div><img src="https://i.ibb.co/hRjRXxP/slider3.jpg" alt="slider1" /></div>
				<div><img src="https://i.ibb.co/g4GrXy2/slider4.jpg" alt="slider1" /></div>
				<div><img src="https://i.ibb.co/0VhHPy7/slider5.jpg" alt="slider1" /></div>
				<div><img src="https://i.ibb.co/10w7KQy/slider6.jpg" alt="slider1" /></div>
			</Carousel>
		</div>
	)
}

export default Slider