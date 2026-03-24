import Image from "next/image";

export function QrCodePlaceholder() {
  return (
    <div className="rounded-[2rem] border border-gold/20 bg-white/95 p-4 shadow-glow sm:p-5">
      <div className="rounded-[1.5rem] border border-black/5 bg-white p-3 sm:p-4">
        <div className="mx-auto w-full max-w-[220px] sm:max-w-[250px]">
          <Image
            src="/payment-qr.jpeg"
            alt="Payment QR code"
            width={921}
            height={1280}
            priority
            className="h-auto w-full rounded-[1.25rem] object-contain"
          />
        </div>
      </div>

      <div className="px-2 pb-2 pt-4 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-obsidian/70">Scan to Pay</p>
        <p className="mt-2 text-sm leading-6 text-black/65">
          Use any UPI app to complete the contribution, then upload the payment confirmation below.
        </p>
      </div>
    </div>
  );
}
