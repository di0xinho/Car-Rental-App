import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeCheckout, StripePaymentElement } from '@stripe/stripe-js';

  // Stripe docs:
  // https://docs.stripe.com/checkout/custom/quickstart
  
export default function useStripePayments () {
  let stripe: Stripe|null = null;
  let checkout: StripeCheckout|null = null;
  let paymentElement: StripePaymentElement|null = null;

  async function initializeStripe() {
    stripe = await loadStripe('pk_test_51MMrdjAWUc4yJL8tU7rjXgnCN6jFXztyN21P8346Ao5jsBcOrJRMT9TM71kkOl7NfycZlXfiw6zXzt47eJHq3ELJ00Sr2zneUJ');
  }

  async function requestCheckoutSession(carId: string, from: string, to: string, city: string, totalHours: number, totalPrice: number, driver: boolean) {
    // Create Stripe Checkut Session on server and get Session Client Secret
    async function fetchClientSecret() {
      const response = await fetch('https://car-rental-merito-application.azurewebsites.net/api/book-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_details: {carId, totalHours, totalPrice, driver, bookedTimeSlots: {from, to}}
        })
      })
      if (!response.ok) {
        throw new Error('Unable to get Client Secret of Checkout Session!');
      }
      const data = await response.json();
      return data.clientSecret;
    }

    if (stripe) {
      checkout = await stripe.initCheckout({fetchClientSecret, elementsOptions: {appearance: {theme: 'stripe'}}});
    } else { 
      throw new Error('No Stripe object instance, please initialize Stripe first, before initializing Checkout!');
    }
  }

  function renderPaymentForm() {
    if (checkout) {
      paymentElement = checkout.createPaymentElement();
      paymentElement.mount("#payment-element");
    } else {
      throw new Error ('Checkout does not exist! Please create Checkout first, before creating Payment Elements!');
    }
  }

  async function confirmPayment() {
    if (checkout) {
      const { type } = await checkout.confirm();
      if(type === 'error') {
        throw new Error ('Can not confirm payment!');
      }
    } else {
      throw new Error ('Can not confirm payment! Checkout does not exist!');
    }
  }

  return {
    stripe,
    checkout,
    paymentElement,
    initializeStripe,
    requestCheckoutSession,
    renderPaymentForm,
    confirmPayment
  }
}