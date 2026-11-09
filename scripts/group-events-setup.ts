import nextEnv from "@next/env";
import { groupSetupReport } from "../src/lib/group-events/setup.ts";
import { formatGroupPrice } from "../src/data/groupEvents.ts";

const command = process.argv[2] ?? "check";
if (command === "check") nextEnv.loadEnvConfig(process.cwd(), true);
const report = groupSetupReport(command === "catalog" ? {} : process.env);
if (command === "catalog") {
  // Product creation worksheet only; this does not create or publish Shopier products.
  console.log(JSON.stringify(report.products.map(({ key, title, eventIds, amountKurus }) => ({ key, title, eventIds, currency: "TRY", price: (amountKurus / 100).toFixed(2), quantity: 1, delivery: "Google Meet" })), null, 2));
} else if (command === "check") {
  console.log(`Grup kayıtları: ${report.enabled ? "AÇIK" : "KAPALI"}`);
  for (const check of report.checks) console.log(`${check.ready ? "HAZIR" : "EKSİK"} · ${check.name}`);
  for (const product of report.products) console.log(`${product.ready ? "HAZIR" : "EKSİK"} · ${product.key} · ${formatGroupPrice(product.amountKurus)}`);
  console.log("Bu kontrol yalnızca ayarların varlığını doğrular. Veritabanı geçişi, Shopier ürün fiyatı, webhook ve gerçek ödeme ayrıca test edilmelidir.");
  process.exitCode = report.allConfigured ? 0 : 1;
} else {
  console.error("Kullanım: node scripts/group-events-setup.ts [check|catalog]");
  process.exitCode = 2;
}
