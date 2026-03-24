"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartHandshake, LoaderCircle, MessageSquareHeart, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { buildFlowUrl } from "@/lib/utils";

type ExtrasFormProps = {
  userId?: string;
  isCompanion: boolean;
  parentUserId?: string | null;
};

export function ExtrasForm({ userId, isCompanion, parentUserId }: ExtrasFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      setError("Your flow reference is missing. Please return to the first step.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (content.trim().length > 0) {
        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            content,
            isAnonymous: true
          })
        });

        const payload = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Your note could not be preserved.");
        }
      }

      router.push(
        buildFlowUrl("/success", {
          userId,
          companion: isCompanion,
          parentUserId
        })
      );
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Your note could not be preserved."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card className="space-y-5 border-gold/10">
        <div className="flex items-center gap-3 text-gold">
          <MessageSquareHeart className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.3em]">Anonymous Suggestion Box</p>
        </div>

        <p className="text-sm leading-7 text-mist/72">
          This space is yours — share anything you&apos;d love to see at the farewell, or something special about your batch.
        </p>

        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="A memory, a song request, a stage moment, or any thought you wish to leave behind."
        />

        <p className="text-xs uppercase tracking-[0.28em] text-mist/45">
          Your note will be treated as anonymous.
        </p>
      </Card>

      <Card className="space-y-5 border-gold/10">
        <div className="flex items-center gap-3 text-gold">
          <HeartHandshake className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.3em]">Companion Booking</p>
        </div>

        <p className="text-sm leading-7 text-mist/72">
          Would you like to bring a companion to share this memorable day?
        </p>

        {!isCompanion && userId ? (
          <Link
            href={buildFlowUrl("/register", {
              companion: true,
              parentUserId: userId
            })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-3.5 text-sm uppercase tracking-[0.2em] text-gold transition hover:border-gold/55 hover:bg-gold/15"
          >
            <UserPlus className="h-4 w-4" />
            Book for a Companion
          </Link>
        ) : (
          <p className="rounded-[1.5rem] border border-gold/15 bg-black/20 px-5 py-4 text-sm text-mist/65">
            Companion registrations remain linked to the primary guest reference already provided.
          </p>
        )}

        <p className="text-xs leading-6 text-mist/45">
          Companion registration opens in a new tab so your current flow remains undisturbed.
        </p>
      </Card>

      {error ? (
        <p className="rounded-2xl border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Preparing your closing note...
          </>
        ) : (
          "Complete with Grace"
        )}
      </Button>
    </form>
  );
}
