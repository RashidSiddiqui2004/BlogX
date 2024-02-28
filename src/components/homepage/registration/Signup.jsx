import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import Loader from '../../../utilities/loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck } from 'react-icons/fa';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordLength, setPasswordLength] = useState(false);
    const [specialSymbol, setSpecialSymbol] = useState(false);
    const [numbers, setNumbers] = useState(false);

    const isPasswordValid = passwordLength && specialSymbol && numbers;

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        // Check password length
        if (newPassword.length >= 8) {
            setPasswordLength(true);
        } else {
            setPasswordLength(false);
        }

        // Check for special symbol
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialChars.test(newPassword)) {
            setSpecialSymbol(true);
        } else {
            setSpecialSymbol(false);
        }

        // Check for numbers
        const numCount = newPassword.replace(/[^0-9]/g, '').length;
        if (numCount >= 2) {
            setNumbers(true);
        } else {
            setNumbers(false);
        }

        // Update password state
        setPassword(newPassword);
    };

    const context = useContext(myContext);
    const { mode, loading, setLoading } = context;

    const isDarkTheme = (mode === 'dark');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)

        } catch (error) {
            toast.error("Login failed, Check your credentials!", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setLoading(false)
        }

    }

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            setLoading(false)
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);


            toast.success("Signup Succesfully", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setName("");
            setEmail("");
            setPassword("");
            await login();

        } catch (error) {

            if (password.length < 6) {
                toast.info("Password should consist of atleast 6 chars", {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }

            else {
                toast.info("User already exits!", {
                    position: "top-right",
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <div className={`flex justify-center items-center h-screen ${isDarkTheme ? 'bg-gray-800' : 'bg-slate-400'}`}>
            {loading && <Loader />}

            <div className='md:px-10 rounded-xl py-10'>
                <div className={`font-bold text-4xl mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                    Blog
                    <span className="text-[#0096FF]">
                        X
                    </span>
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='What should we call you?'
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='name@domain.com'
                    />
                </div>
                <div>
                    {/* <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Shhh. its secret, Keep it strong'
                    />

                    <p className='text-white mb-3 italic font-semibold'>Password should be of atleast 6 characters.</p> */}

                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Shhh. its secret, Keep it strong'
                    />

                    <div className="text-white mx-4 mt-2 mb-2 gap-3">
                        <p className="italic font-semibold">
                            <span className={` flex flex-row gap-4 mt-2 ${passwordLength ? 'text-green-400' : 'text-gray-400'} `}>
                                <FaCheck className='' /> At least 8 characters
                            </span>
                        </p>
                        <p className="italic font-semibold">
                            <span className={` flex flex-row gap-4 ${specialSymbol ? 'text-green-400' : 'text-gray-400'} `}>
                                <FaCheck className='' /> At least 1 special symbol
                            </span>
                        </p>
                        <p className="italic font-semibold">
                            <span className={` flex flex-row gap-4 ${numbers ? 'text-green-400' : 'text-gray-400'} `}>
                                <FaCheck className='' />  At least 2 numbers
                            </span>
                        </p>
                    </div>

                    {/* <div className="text-white mb-3">
                <p className={`italic font-semibold ${passwordLength ? 'line-through' : ''}`}>
                    Password should be of at least 8 characters.
                    {passwordLength && <span>&#10003;</span>}
                </p>
                <p className={`italic font-semibold ${specialSymbol ? 'line-through' : ''}`}>
                    Password should contain at least 1 special symbol.
                    {specialSymbol && <span>&#10003;</span>}
                </p>
                <p className={`italic font-semibold ${numbers ? 'line-through' : ''}`}>
                    Password should contain at least 2 numbers.
                    {numbers && <span>&#10003;</span>}
                </p>
            </div> */}

                </div>
                <div className=' flex justify-center mb-3'>
                    {
                        isPasswordValid
                            ?
                            <button
                                onClick={signup}
                                className='bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                                Signup
                            </button>
                            :
                            <button
                                disabled={true}
                                className='bg-slate-400 w-full text-slate-800 font-bold  px-2 py-2 rounded-lg'>
                                Signup
                            </button>
                    }

                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup