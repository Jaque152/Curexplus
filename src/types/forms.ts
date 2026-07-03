export interface ContactRequestPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  lang: "es" | "en";
}

export interface QuoteRequestPayload {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  lang: "es" | "en";
}

export interface FormApiResponse {
  success: boolean;
  error?: string;
}