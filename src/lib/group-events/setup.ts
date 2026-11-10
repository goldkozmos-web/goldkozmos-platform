import { groupEventOffers } from "../../data/groupEvents.ts";
import { bankPaymentDetails } from "./bank.ts";

type Environment = Record<string, string | undefined>;
export function groupSetupReport(env: Environment) {
  const present = (names: string[]) => names.some(name => !!env[name]?.trim());
  const checks = [
    { name: "Veritabanı adresi", ready: present(["NEXT_PUBLIC_SUPABASE_URL"]) },
    { name: "Veritabanı genel anahtarı", ready: present(["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]) },
    { name: "Veritabanı sunucu anahtarı", ready: present(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_KEY"]) },
    { name: "Shopier sipariş erişimi", ready: present(["SHOPIER_PAT"]) },
    { name: "Shopier bildirim doğrulaması", ready: present(["SHOPIER_WEBHOOK_TOKEN"]) },
    { name: "Başvuru koruma anahtarı", ready: (env.GROUP_EVENT_RATE_SECRET?.trim().length ?? 0) >= 32 },
    { name: "Onay e-postası hizmeti", ready: present(["RESEND_API_KEY"]) && present(["GROUP_EVENT_EMAIL_FROM"]) },
  ];
  const configuredIds = groupEventOffers.map(offer => env[offer.productEnv]?.trim()).filter(Boolean);
  const products = groupEventOffers.map(offer => {
    const id = env[offer.productEnv]?.trim();
    return {
      key: offer.productEnv,
      title: offer.events.map(event => event.title).join(" + "),
      eventIds: offer.events.map(event => event.id),
      amountKurus: offer.totalKurus,
      ready: !!id && /^[0-9]{1,30}$/.test(id) && configuredIds.filter(other => other === id).length === 1,
    };
  });
  const bankReady = !!bankPaymentDetails(env);
  const cardReady = checks[3].ready && checks[4].ready && products.every(product => product.ready);
  const coreReady = checks.slice(0,3).every(check => check.ready) && checks[5].ready;
  checks.push({ name: "IBAN ve hesap sahibi", ready: bankReady });
  return { enabled: env.GROUP_EVENTS_ENABLED === "true", checks, products, bankReady, cardReady, allConfigured: coreReady && (bankReady || cardReady) };
}
