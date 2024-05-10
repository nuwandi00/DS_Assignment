import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51P9AbBCYsAvQyhDS6xE2IT0FuTF3WvtfUvTvC9H2uMWNQGOlm7B2iOzxj5n44pwlCFK18xBJBLNlQFQ97z5lEYis00dLKWLioh"
    );
  }
  return stripePromise;
};

export default getStripe;
