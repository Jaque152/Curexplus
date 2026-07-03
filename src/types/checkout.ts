export interface CustomerInformation {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone1: string;
  city: string;
  address1: string;
  postalCode: string;
  state: string;
  country: string;
  ip?: string;
}

export interface CardInformationInput {
  cardNumber: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

export interface CheckoutItemPayload {
  id: string | number;
  title: string;
  amount: number;
  quantity: number;
}

export interface CheckoutRequestPayload {
  amount: number;
  subtotal: number;
  iva: number;
  currency: number;
  reference: string;
  lang: "es" | "en";
  customerInformation: CustomerInformation;
  cardInformation: CardInformationInput;
  items: CheckoutItemPayload[];
}

export interface EtominSigninResponse {
  authToken?: string;
  error?: string;
  message?: string;
}

export interface EtominTokenizerResponse {
  cardNumberToken?: string;
  error?: string;
  message?: string;
}

export interface EtominSaleResponse {
  id?: string | number;
  reference?: string;
  status?: string;
  transactionId?: string;
  authorizationNumber?: string;
  responseCode?: string;
  message?: string;
  error?: string;
  redirectTo?: string;
}

export interface CheckoutApiResponse {
  success: boolean;
  status?: string;
  reference?: string;
  transactionId?: string;
  authorizationNumber?: string;
  error?: string;
}