import { PageHeader } from "@/components/layout/page-header";
import { TransferOptionCard } from "@/components/transfer/transfer-option-card";
import { Coins, Users, QrCode, Landmark, DollarSign } from "lucide-react";
import { ROUTES } from "@/lib/constants";

const options = [
  {
    href: `${ROUTES.TRANSFER_ADD_FUND}?method=stablecoin`,
    icon: Coins,
    title: "Add Fund (Stablecoin)",
    description: "Top up with USDT, convert to USD or VND",
  },
  {
    href: `${ROUTES.TRANSFER_ADD_FUND}?method=user`,
    icon: Users,
    title: "Add Fund (BeamPay)",
    description: "Receive from another BeamPay user",
  },
  {
    href: `${ROUTES.TRANSFER_SEND}?method=qr`,
    icon: QrCode,
    title: "Pay via QR Code",
    description: "Scan or show QR to pay instantly",
  },
  {
    href: `${ROUTES.TRANSFER_SEND}?method=bank&country=vn`,
    icon: Landmark,
    title: "Vietnam Bank Transfer",
    description: "Send to Vietnamese bank accounts",
  },
  {
    href: `${ROUTES.TRANSFER_SEND}?method=bank&country=id`,
    icon: Landmark,
    title: "Indonesia Bank Transfer",
    description: "Send to Indonesian bank accounts",
  },
  {
    href: `${ROUTES.TRANSFER_SEND}?method=bank&country=ph`,
    icon: Landmark,
    title: "Philippines Bank Transfer",
    description: "Send to Philippine bank accounts",
  },
  {
    href: `${ROUTES.TRANSFER_SEND}?method=crypto`,
    icon: DollarSign,
    title: "USDT / USD Transfer",
    description: "Send crypto to a wallet address",
  },
];

export default function TransferPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Transfer" />
      <div className="flex flex-col gap-2 px-4">
        {options.map((opt) => (
          <TransferOptionCard key={opt.href} {...opt} />
        ))}
      </div>
    </div>
  );
}
