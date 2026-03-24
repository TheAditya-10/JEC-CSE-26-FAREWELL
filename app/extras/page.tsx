import { ExtrasForm } from "@/components/forms/extras-form";
import { PageShell } from "@/components/page-shell";

type ExtrasPageProps = {
  searchParams: Promise<{
    user_id?: string;
    companion?: string;
    parent_id?: string;
  }>;
};

export default async function ExtrasPage({ searchParams }: ExtrasPageProps) {
  const params = await searchParams;
  const isCompanion = params.companion === "true";
  const backHref = new URLSearchParams({
    ...(params.user_id ? { user_id: params.user_id } : {}),
    ...(params.companion ? { companion: params.companion } : {}),
    ...(params.parent_id ? { parent_id: params.parent_id } : {})
  }).toString();

  return (
    <PageShell
      eyebrow="Step 3"
      title={isCompanion ? "One Final Note" : "A Personal Touch"}
      description={
        isCompanion
          ? "Complete the companion record and, if you wish, leave behind a note with quiet affection."
          : "Before the curtain rises, leave a thought, a memory, or extend the invitation to a companion."
      }
      backHref={backHref ? `/payment?${backHref}` : "/payment"}
    >
      <ExtrasForm
        userId={params.user_id}
        isCompanion={isCompanion}
        parentUserId={params.parent_id ?? null}
      />
    </PageShell>
  );
}
