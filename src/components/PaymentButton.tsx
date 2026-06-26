import React from "react";
import { createOrder } from "../services/paymentService";

interface PaymentButtonProps {
    edition: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ edition }) => {
    const handlePayment = async () => {
        try {
            const data = await createOrder(edition);

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "MangoSeed",
                description: `${edition} Purchase`,
                order_id: data.id,

                handler: function (response: any) {
                    alert("Payment Successful");
                    console.log(response);
                },

                prefill: {
                    name: "Customer",
                    email: "customer@example.com",
                },

                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment Failed");
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
            Pay Now
        </button>
    );
};

export default PaymentButton;