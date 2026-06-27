import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export const handlePayment = async (item, user) => {

  const options = {

    key: import.meta.env.VITE_RAZORPAY_KEY,

    amount: item.amount * 100,

    currency: "INR",

    name: "BidVerse",

    description: item.title,

    image:
      "https://cdn-icons-png.flaticon.com/512/263/263142.png",

    handler: async function (response) {

      // STORE TRANSACTION

      await addDoc(
        collection(db, "transactions"),
        {

          itemId: item.id,

          itemTitle: item.title,

          amount: item.amount,

          paymentId:
            response.razorpay_payment_id,

          buyerId: user?.uid || "guest",

          buyerName:
            user?.displayName || "Guest",

          createdAt: Timestamp.now(),
        }
      );

      alert(
        "Payment Successful! Luxury item purchased."
      );
    },

    prefill: {

      name:
        user?.displayName || "BidVerse User",

      email: "demo@bidverse.com",

      contact: "9999999999",
    },

    theme: {
      color: "#ffcc00",
    },
  };

  const razorpay =
    new window.Razorpay(options);

  razorpay.open();
};