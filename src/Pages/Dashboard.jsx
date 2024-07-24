import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Button, notification } from 'antd';

const Dashboard = () => {
    const [car, setCar] = useState([]);
    const [category, setCategory] = useState('');
    const [des, setDes] = useState('');
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
            const updatedCar = snapshot.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }));
            setCar(updatedCar);
        });

        return () => unsubscribe();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!category || !des || !img || !price) {
            notification.error({
                message: "Data not submitted",
                description: "Please fill in all fields"
            });
            return;
        }
        
        const dataBase = collection(db, 'blogs');
        await addDoc(dataBase, {
            category: category,
            description: des,
            img: img,
            price: parseFloat(price), // Convert price to float (assuming it's a number)
            id: uuidv4()
        });

        notification.success({
            message: "Data submitted",
            description: "Data successfully added"
        });

        setCategory('');
        setDes('');
        setImg('');
        setPrice('');
    }

    const handleDelete = async (id) => {
        const deletePost = doc(db, 'blogs', id);
        await deleteDoc(deletePost);
        setCar(prevCars => prevCars.filter(item => item.id !== id));
    };

    const handleEdit = (category, des, img, id, price) => {
        setCategory(category);
        setDes(des);
        setImg(img);
        setPrice(price.toString()); // Convert price to string for input field
        setId(id);
        setShow(false); // Show modal for "Update Notes"
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleUpdate = async () => {
        const updateData = doc(db, 'blogs', id);
        await updateDoc(updateData, { category, description: des, img, price: parseFloat(price) });
        setCar(prevCars => prevCars.map(item => {
            if (item.id === id) {
                return { ...item, category, description: des, img, price: parseFloat(price) };
            }
            return item;
        }));
        setShow(true);
        setCategory('');
        setDes('');
        setImg('');
        setPrice('');
        setId('');
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900">Mashina Qo'shing</h1>
                    <p className="leading-relaxed mt-4">Yangi mashina qo'shing yoki o'zgartiring</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">{show ? 'Create' : 'Update'} Car</h2>
                    <div className="relative mb-4">
                        <label htmlFor="category" className="leading-7 text-sm text-gray-600">Mashina turi</label>
                        <input type="text" id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Moshina turi" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Malumoti</label>
                        <input type="text" id="description" name="description" value={des} onChange={(e) => setDes(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="malumot" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="price" className="leading-7 text-sm text-gray-600">Narx</label>
                        <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="narx" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="image" className="leading-7 text-sm text-gray-600">Rasm</label>
                        <input type="text" id="image" name="image" value={img} onChange={(e) => setImg(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="rasm linki" />
                    </div>
                    <Button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mb-4" onClick={show ? handleCreate : handleUpdate}>{show ? 'Create' : 'Update'}</Button>
                    <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {car.map(item => (
                        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full h-64 object-cover object-center" src={item.img} alt="content" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{item.category}</div>
                                <p className="text-black-700 text-base">{item.description}</p>
                            </div>
                            <div className="text-gray-700 ml-[30px]">${item.price}</div> {/* Price display */}
                            <div className="px-6 py-4">
                                <Button className="border px-4 py-2 bg-red-500 text-white rounded-lg mr-2" onClick={() => handleDelete(item.id)}>O'chirish</Button>
                                <Button className="border px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => handleEdit(item.category, item.description, item.img, item.id, item.price)}>O'zgartirish</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
