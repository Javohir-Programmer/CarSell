// Home.js
import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from 'react-use-cart';

const Home = () => {
    const [car, setCar] = useState([]);
    const { addItem } = useCart();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
            const updatedCar = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                price: doc.data().price // Assuming price is a field in your Firestore document
            }));
            setCar(updatedCar);

            setLikedItems(updatedCar.reduce((acc, item) => {
                acc[item.id] = { liked: false };
                return acc;
            }, {}));

          
        });

        return () => unsubscribe();
    }, []);

   

   

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto px-4 py-8">
                <div className="products">
                    {car.map(item => (
                        <div key={item.id} className="product__box">
                            <img className="products__image" src={item.img} alt={item.category} />
                            <div className="product__datails">
                                    <div className="product__category">{item.category}</div>
                                <p className="product__description">{item.description}</p>
                                    <div className="product__price">${item.price}</div>
                                    <div>
                                        
                                       
                                    </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
}

export default Home;
