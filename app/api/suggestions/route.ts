import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sql } from "@/lib/db";
import { suggestionSchema } from "@/lib/validations";

type UserRow = {
  id: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = suggestionSchema.parse(body);

    if (parsed.userId) {
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
    }

    await sql`
      INSERT INTO suggestions (user_id, content, is_anonymous)
      VALUES (${parsed.userId ?? null}, ${parsed.content}, ${parsed.isAnonymous})
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "We could not preserve your note at this time."
      },
      { status: 500 }
    );
  }
}
