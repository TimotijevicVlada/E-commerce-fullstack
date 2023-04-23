import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {

    const router = useRouter();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h1>WELCOME TO HOME PAGE</h1>
            <button onClick={() => router.push("/")}>Go to default page</button>
            <button>PAYMENT</button>
        </div>
    )
}

export default Home;