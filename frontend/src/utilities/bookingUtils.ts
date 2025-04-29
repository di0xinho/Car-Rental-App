import type { CreateBookingDetails } from "./models/bookingModel";

export async function bookCar (
  details: CreateBookingDetails,
  success_url: string,
  cancel_url: string,
  paymentType: 'stripe'|'on-the-spot'
) {
  const url = import.meta.env.VITE_API_BOOK_CAR + "?payment_type=" + paymentType;

  if (paymentType === 'stripe') {
    // Using Stripe payments we have to pass full page adress (including protocol and domain name) for Stripe to be able to redirect after payment
    success_url = import.meta.env.VITE_DOMAIN_NAME + success_url;
    cancel_url = import.meta.env.VITE_DOMAIN_NAME + cancel_url;
  }
  console.log('success_url: ', success_url);
  const response = await fetch(url, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      booking_details: details,
      success_url: success_url,
      cancel_url: cancel_url    
    }),
    credentials: 'include'
  });
  const responseData = await response.json();
  console.log('response data: ', responseData);
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, url: string};
}