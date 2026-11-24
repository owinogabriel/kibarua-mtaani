// phone must be 2547XXXXXXXX (no plus)
export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}