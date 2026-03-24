import { PaymentForm } from "@/components/forms/payment-form";
import { PageShell } from "@/components/page-shell";

type PaymentPageProps = {
  searchParams: Promise<{
    user_id?: string;
    companion?: string;
    parent_id?: string;
  }>;
};

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams;

  return (
    <PageShell
      eyebrow="Step 2"
      title="Seal Your Confirmation"
      description="A final contribution of grace ensures that your seat is reserved for the day."
      backHref="/register"
    >
      <PaymentForm
        userId={params.user_id}
        isCompanion={params.companion === "true"}
        parentUserId={params.parent_id ?? null}
      />
    </PageShell>
  );
}
