export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
  country: string;
}

export function isCheckoutDetailsComplete(form: CheckoutFormData) {
  return Boolean(
    form.email.trim() &&
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.addressLine1.trim() &&
      form.city.trim() &&
      form.postcode.trim() &&
      form.country.trim()
  );
}
