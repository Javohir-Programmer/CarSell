import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; // Assuming you are using Firestore

const SignUp = () => {
    const [userSignUp, setUserSignUp] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userSignUp.email,
                userSignUp.password
            );

            const user = {
                name: userSignUp.name,
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                role: userSignUp.role,
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userDataRef = collection(db, "users"); // Replace 'users' with your Firestore collection name
            await addDoc(userDataRef, user);

            // Clear form fields after successful registration
            setUserSignUp({
                name: "",
                email: "",
                password: "",
                role: "user",
            });

            setError(null); // Clear any previous errors

            // Optionally, you can redirect the user to another page after successful registration
            // history.push('/dashboard'); // Make sure to import 'history' from react-router-dom
        } catch (error) {
            console.error("Error signing up:", error.message);
            setError(error.message);
        }
    };

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">
                           Malumotlarni to'ldirib ro'yhatdan o'ting
                        </h1>
                        <p className="leading-relaxed mt-4">
                            Poke slow-carb mixtape knausgaard, typewriter street art
                            gentrify hammock starladder roathse. Craies vegan tousled
                            etsy austin.
                        </p>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
                    >
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                            Sign Up
                        </h2>

                        {error && (
                            <p className="text-red-500 text-xs mb-4">{error}</p>
                        )}

                        <div className="relative mb-4">
                            <label
                                htmlFor="name"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={userSignUp.name}
                                onChange={(e) =>
                                    setUserSignUp({
                                        ...userSignUp,
                                        name: e.target.value,
                                    })
                                }
                                name="name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="email"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={userSignUp.email}
                                onChange={(e) =>
                                    setUserSignUp({
                                        ...userSignUp,
                                        email: e.target.value,
                                    })
                                }
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="password"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={userSignUp.password}
                                onChange={(e) =>
                                    setUserSignUp({
                                        ...userSignUp,
                                        password: e.target.value,
                                    })
                                }
                                name="password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Sign Up
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                            Literally you probably heard of them jean shorts.
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignUp;
