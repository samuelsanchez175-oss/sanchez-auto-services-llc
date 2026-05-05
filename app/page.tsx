import { MarketingHomeShell } from "@/components/marketing/marketing-home-shell";
import { resolveHeroBackgroundSrc } from "@/lib/media";

export default function Page() {
  const heroSrc = resolveHeroBackgroundSrc();

  // mapsSlot is intentionally null until Google Places data is synced via
  // `npm run gallery:pull` — avoids showing the blank MapsSyncHint placeholder.
  return <MarketingHomeShell heroSrc={heroSrc} mapsSlot={null} />;
}
