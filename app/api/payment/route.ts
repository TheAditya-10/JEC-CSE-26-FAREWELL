import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sql } from "@/lib/db";
import { uploadPaymentScreenshot } from "@/lib/upload";
import { paymentSchema } from "@/lib/validations";

type UserRow = {
  id: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const userId = String(formData.get("userId") ?? "");
    const transactionId = String(formData.get("transactionId") ?? "");
    const screenshot = formData.get("screenshot");

    const parsed = paymentSchema.parse({ userId, transactionId });

    if (!(screenshot instanceof File) || screenshot.size === 0) {
      return NextResponse.json(
        { error: "Please attach the payment screenshot before proceeding." },
        { status: 400 }
      );
    }

    if (screenshot.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Please upload a screenshot no larger than 5 MB." },
        { status: 400 }
      );
    }

    const user = await sql<UserRow>`
      SELECT id
      FROM users
      WHERE id = ${parsed.userId}
      LIMIT 1
    `;

    if (user.length === 0) {
      return NextResponse.json(
        { error: "The linked registration could not be found." },
        { status: 404 }
      );
    }

    const screenshotUrl = await uploadPaymentScreenshot(screenshot);

    await sql`
      INSERT INTO payments (user_id, transaction_id, screenshot_url, amount)
      VALUES (${parsed.userId}, ${parsed.transactionId}, ${screenshotUrl}, 1000)
      ON CONFLICT (user_id) DO UPDATE
      SET
        transaction_id = EXCLUDED.transaction_id,
        screenshot_url = EXCLUDED.screenshot_url,
        amount = EXCLUDED.amount,
        created_at = NOW()
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "We could not save the payment confirmation at this time."
      },
      { status: 500 }
    );
  }
}
