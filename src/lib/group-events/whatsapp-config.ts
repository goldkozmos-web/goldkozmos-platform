import { whatsappPhone } from "./bank.ts";
export function whatsappConfigured(env: Record<string, string | undefined> = process.env) {
  return !!env.WHATSAPP_ACCESS_TOKEN && /^\d+$/.test(env.WHATSAPP_PHONE_NUMBER_ID ?? "") &&
    /^v\d+\.\d+$/.test(env.WHATSAPP_GRAPH_VERSION ?? "") && /^[a-z0-9_]+$/.test(env.WHATSAPP_APPROVAL_TEMPLATE ?? "") &&
    env.WHATSAPP_APPROVAL_TEMPLATE_READY === "true";
}
export function approvalTemplatePayload(phone: string, name: string) {
  const to = whatsappPhone(phone);
  if (!to || !/^[a-z0-9_]+$/.test(name)) throw new Error("WhatsApp numarası veya şablonu geçersiz.");
  return { messaging_product: "whatsapp", to, type: "template", template: { name, language: { code: "tr" } } };
}
