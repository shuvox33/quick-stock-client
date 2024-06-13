import { useEffect, useState } from 'react';
import './CheckOutForm.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import axiosSecure from '@/api';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CheckoutForm = ({ selectedPack, setOpenModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();

    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState();
    const [error, setError] = useState('');
    const [processing, setPrecessing] = useState(false);

    // const { data } = useQuery({
    //     queryKey: ['paymentinfo', selectedPack],
    //     queryFn: async () => await axiosSecure.post('/create-payment-intent', selectedPack),
    //     enabled: !!selectedPack
    // },
    // )
    useEffect(()=>{
        if(selectedPack?.price && selectedPack?.price > 1){
            getClientS();
        }
    },[selectedPack])

    const getClientS = async ()=>{
        const {data} = await axiosSecure.post('/create-payment-intent', selectedPack)
        setClientSecret(data?.clientSecret)
    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        setPrecessing(true)
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error);
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const {error:confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email,
                    name:user?.displayName,
                },
            },
        })

        if(confirmError){
            console.log(confirmError);
            setError(confirmError.message);
            setPrecessing(false);
            return
        }

        if(paymentIntent.status === 'succeeded'){
            const paymentInfo = {
                package: selectedPack?.price,
                limit: selectedPack?.limit,
                userEmail: user?.email,
                userName: user?.displayName,
                transactionId: paymentIntent?.id,
                date: new Date(),
            }
            console.log(paymentInfo);
            try {
                await axiosSecure.post('/subscription', paymentInfo)
                setOpenModal(false)
                navigate('/dashboard')
                toast.success('payment successful')

            } catch (error) {
                console.log(error.message);
            }
        }

        setPrecessing(false)
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay ${selectedPack?.price}
            </button>
        </form>
        {error && <p className='text-red-600 text-xl text-center'>{error}</p>}
        </>
    );
};


CheckoutForm.propTypes = {
    selectedPack: PropTypes.object,
    setOpenModal: PropTypes.object
}
export default CheckoutForm;