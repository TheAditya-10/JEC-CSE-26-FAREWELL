import { RegisterForm } from "@/components/forms/register-form";
import { PageShell } from "@/components/page-shell";

type RegisterPageProps = {
  searchParams: Promise<{
    companion?: string;
    parent_id?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const isCompanion = params.companion === "true";
  const parentUserId = params.parent_id ?? null;

  return (
    <PageShell
      eyebrow={isCompanion ? "Companion Entry" : "Step 1"}
      title={isCompanion ? "Companion Registration" : "A Gracious Beginning"}
      description={
        isCompanion
          ? "Add the companion details with the same care and polish as the primary invitation."
          : "Share the details that will hold your place in this farewell gathering."
      }
    >
      <RegisterForm isCompanion={isCompanion} parentUserId={parentUserId} />
    </PageShell>
  );
}
