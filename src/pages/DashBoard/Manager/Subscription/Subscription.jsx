import useAuth from "@/hooks/useAuth";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from "@/components/Form/CheckOutForm";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Subscription = () => {
    const { user } = useAuth();
    console.log(user?.email);

    const handleFirstPack = () => {
        setOpenModal(true)
    }
    const handleSecondPack = () => {
        setOpenModal(true)

    }
    const handleThirdPack = () => {
        setOpenModal(true)

    }
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="flex gap-x-5 min-h-screen items-center justify-center">
            <div className="card w-80 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Make product Limit to 200</h2>
                    <p> You hava to pay 10 dollars to increase the limit to 200</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleFirstPack} className="btn btn-primary">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Make product Limit to 450</h2>
                    <p> You hava to pay 20 dollars to increase the limit to 450</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleSecondPack} className="btn btn-primary">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Make product Limit to 1500</h2>
                    <p> You hava to pay 50 dollars to increase the limit to 1500</p>
                    <div className="card-actions justify-end">
                        <button onClick={handleThirdPack} className="btn btn-primary">Subscribe</button>
                    </div>
                </div>
            </div>


            <div>
                <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                    <div className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                        <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                        <h1 className="mb-2 text-2xl font-semibold">Welcome to NavigateUI!</h1>
                        <p className="px-1 mb-3 text-sm opacity-80">Elevate your React projects with beautifully crafted components designed for TailwindCSS.</p>
                        <Elements stripe={stripePromise}>
                            <CheckOutForm></CheckOutForm>
                        </Elements>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Subscription;