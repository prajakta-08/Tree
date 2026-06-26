export const createOrder = async (edition: string) => {
    const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ edition }),
    });

    if (!res.ok) {
        throw new Error("Failed to create order");
    }

    return res.json();
};