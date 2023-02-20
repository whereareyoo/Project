import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { setBasket } from "../basket/BasketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51McykSIE8NhpElJoGcgc6YRy9aN8roDlvzPbKbMF0cLqQZ4RuJf24bLbJBcq7vB0jqF7kuK4bjHglaaEbWyYXuRj00L0LNnc3u');

export default function CheckoutWrapper()
{
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponents message='Loading checkouts...' />

    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}