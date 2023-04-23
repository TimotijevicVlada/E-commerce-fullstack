import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Home = () => {

    const router = useRouter();

    const STRIPE_KEY = "pk_test_51N075tHhniLq8Q1gXnqlMvCzbh99bDytImirmUTo4Dkl29A1CtH3uaemKWaThrGEEiIRMLQ8AzXidDmHAJjh3hrS00nnZ7xKCE";
    const [stripeToken, setStripeToken] = useState(null);

    useEffect(() => {
        if (!stripeToken) return;
        makeOrder();
    }, [stripeToken])

    const makeOrder = async () => {
        try {
            const response = await axios.post("http://localhost:5000/payment");
            console.log("RESPONSE", response)
        } catch (error) {
            console.log(error)
        }
    }

    const onToken = (token: any) => {
        console.log("TOKEN", token)
        setStripeToken(token);
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h1>WELCOME TO HOME PAGE</h1>
            <button onClick={() => router.push("/")}>Go to default page</button>

            <StripeCheckout
                name='E-commerce vlada'
                image='/'
                billingAddress
                shippingAddress
                description='Your total is $20'
                amount={2000}   //That means $20
                token={onToken}
                stripeKey={STRIPE_KEY}
            />
        </div>
    )
}

export default Home;