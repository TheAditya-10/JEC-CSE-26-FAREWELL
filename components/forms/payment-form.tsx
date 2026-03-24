"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QrCodePlaceholder } from "@/components/qr-code-placeholder";
import { CONTRIBUTION_AMOUNT } from "@/lib/constants";
import { buildFlowUrl } from "@/lib/utils";

type PaymentFormProps = {
  userId?: string;
  isCompanion: boolean;
  parentUserId?: string | null;
};

export function PaymentForm({ userId, isCompanion, parentUserId }: PaymentFormProps) {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      setError("Your registration reference is missing. Please begin again from the registration step.");
      return;
    }

    if (!file) {
      setError("Please attach the payment screenshot before proceeding.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("userId", userId);
      formData.set("transactionId", transactionId);
      formData.set("screenshot", file);

      const response = await fetch("/api/payment", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "The payment confirmation could not be preserved.");
      }

      router.push(
        buildFlowUrl("/extras", {
          userId,
          companion: isCompanion,
          parentUserId
        })
      );
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The payment confirmation could not be preserved."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="space-y-6 border-gold/10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <QrCodePlaceholder />
          <div className="rounded-[1.5rem] border border-gold/10 bg-black/25 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold/70">Contribution</p>
            <p className="mt-3 text-lg text-mist/80">
              Kindly contribute <span className="font-semibold text-gold">₹{CONTRIBUTION_AMOUNT}</span> to confirm your participation.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 text-gold">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-xs uppercase tracking-[0.3em]">Payment Confirmation</p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-mist/80">UPI Transaction ID</span>
            <Input
              required
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
              placeholder="Paste the payment reference"
            />
          </label>

          <label className="block cursor-pointer space-y-2">
            <span className="text-sm text-mist/80">Payment Screenshot</span>
            <div className="rounded-[1.5rem] border border-dashed border-gold/30 bg-black/25 px-5 py-8 text-center transition hover:border-gold/55 hover:bg-black/35">
              <Upload className="mx-auto h-6 w-6 text-gold" />
              <p className="mt-4 text-sm text-mist/75">
                {file ? file.name : "Upload a clear screenshot of the completed payment"}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-mist/45">
                PNG, JPG, WEBP up to 5 MB
              </p>
            </div>
            <Input
              required
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>

          {error ? (
            <p className="rounded-2xl border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Securing your confirmation...
              </>
            ) : (
              "Confirm with Grace"
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
