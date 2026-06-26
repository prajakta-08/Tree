import React from "react";

import {'{' } createOrder { '}' } from "../services/paymentService";

const PaymentButton = () => { '{' }

const handlePayment = async () => { '{' }

try { '{' }

const { '{'} data { '}'} = await createOrder(499);

const options = { '{'}

key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: data.amount,

        currency: data.currency,

            name: "MangoSeed",

                description: "Book Purchase",

                    order_id: data.id,

                        handler: function (response: any) { '{' }

alert("Payment Successful");

console.log(response);

{ '}' },

prefill: { '{' }

name: "Customer",

    email: "customer@example.com"

{ '}' },

theme: { '{' }

color: "#3399cc"

{ '}' }

{ '}' };

const rzp = new window.Razorpay(options);

rzp.open();

{ '}' } catch (error) { '{' }

console.error(error);

alert("Payment failed");

{ '}' }

{ '}' };

return (

    <button
        import React from "react";
import { createOrder } from "../services/paymentService";

interface PaymentButtonProps {
    edition: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ edition }) => {
    const handlePayment = async () => {
        try {
            // Create Razorpay Order
            const data = await createOrder(edition);

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: "INR",
                name: "MangoSeed",
                description: `${edition} Purchase`,
                order_id: data.orderId,

                handler: function (response: any) {
                    alert("Payment Successful!");

                    console.log("Payment ID:", response.razorpay_payment_id);
                    console.log("Order ID:", response.razorpay_order_id);
                    console.log("Signature:", response.razorpay_signature);

                    // Later call your verify API here
                },

                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert("Payment Failed");
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
            Buy Now
        </button>
    );
};

export default PaymentButton;
        onClick={'{'} handlePayment{'}'}

        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

        Pay ₹499

</button >

);

{ '}' };

export default PaymentButton;