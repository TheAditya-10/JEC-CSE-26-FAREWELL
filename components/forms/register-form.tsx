"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { buildFlowUrl } from "@/lib/utils";

type RegisterFormProps = {
  isCompanion: boolean;
  parentUserId?: string | null;
};

export function RegisterForm({ isCompanion, parentUserId }: RegisterFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          gender,
          phone,
          email,
          isCompanion,
          parentUserId
        })
      });

      const payload = (await response.json()) as { error?: string; userId?: string };

      if (!response.ok || !payload.userId) {
        throw new Error(payload.error || "We could not preserve your registration just now.");
      }

      router.push(
        buildFlowUrl("/payment", {
          userId: payload.userId,
          companion: isCompanion,
          parentUserId
        })
      );
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not preserve your registration just now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-gold/10 bg-white/7">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 text-gold">
          <UserRoundPlus className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.3em]">
            {isCompanion ? "Companion Registration" : "Personal Details"}
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-mist/80">Full Name</span>
          <Input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-mist/80">Gender</span>
          <Select value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-mist/80">Phone Number</span>
          <Input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="A number we can reach if needed"
            inputMode="tel"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-mist/80">Email</span>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="An email for gentle updates"
            type="email"
          />
        </label>

        {error ? (
          <p className="rounded-2xl border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        <Button type="submit" fullWidth disabled={isSubmitting} className="animate-pulse-glow">
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Holding your place...
            </>
          ) : isCompanion ? (
            "Continue for the Companion"
          ) : (
            "Proceed with Dignity"
          )}
        </Button>
      </form>
    </Card>
  );
}
