'use client';
import { useEffect, useState } from 'react';
import CarouselCard from './carousel-card';

const images = [
     {
          src: "/view2.jpg",
          altText: "Slide 1",
     },
     {
          src: "/view1.jpg",
          altText: "Slide 2",
     },
     {
          src: "/view3.jpg",
          altText: "Slide 3",
     },
];
export default function CarouselContainer() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000); // Change image every 3 seconds

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			{images.map((item, index) => (
				<CarouselCard
					key={index}
					image={item.src}
					isActive={index === activeIndex}
				/>
			))}
		</>
	);
}
