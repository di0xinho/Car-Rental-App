import { Booking, type BookingStatus, type CreateBookingDetails, type GetBookingsSuccess } from "@/utilities/models/bookingModel";

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
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, url: string};
}

// API query params: carId, isPaid, startDate, endDate, page, limit, status
export async function getUserBookings (status?: BookingStatus[], page?: number) {
  const params = new URLSearchParams();
  if (status) status.forEach(value => params.append('status', value));
  if (page) params.append('page', page.toString());

  const url = import.meta.env.VITE_API_GET_USER_BOOKINGS + '?' + params;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as GetBookingsSuccess;
}

export async function getAllBookings (status?: BookingStatus[], page?: number) {
  const params = new URLSearchParams();
  if (status) status.forEach(value => params.append('status', value));
  if (page) params.append('page', page.toString());

  const url = import.meta.env.VITE_API_GET_ALL_BOOKINGS + '?' + params;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as GetBookingsSuccess;
}

export async function startRent (bookingId: string, dateFrom: string, isPaid: boolean) {
  const url = import.meta.env.VITE_API_RENT_START + bookingId;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({from: dateFrom, isPaid: isPaid}),
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, data: Booking, success: boolean};
}

export async function endRent (bookingId: string, dateTo: string, currentCarMileage: number) {
  const url = import.meta.env.VITE_API_RENT_END + bookingId;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: dateTo,
      carMileageAtEnd: currentCarMileage
    }),
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, data: Booking, success: boolean};
}

export async function setBookingStatus (bookingId: string, status: BookingStatus) {
  const url = import.meta.env.VITE_API_SET_BOOKING_STATUS + bookingId;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: status,
    }),
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, data: Booking, success: boolean};
}

export async function deleteBooking (bookingId: string) {
  const url = import.meta.env.VITE_API_DELETE_BOOKING + bookingId;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, data: Booking, success: boolean};
}

