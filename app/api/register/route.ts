import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sql } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

type UserRow = {
  id: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    if (parsed.isCompanion && !parsed.parentUserId) {
      return NextResponse.json(
        { error: "A companion registration must include the primary guest reference." },
        { status: 400 }
      );
    }

    if (parsed.parentUserId) {
      const parent = await sql<UserRow>`
        SELECT id
        FROM users
        WHERE id = ${parsed.parentUserId}
        LIMIT 1
      `;

      if (parent.length === 0) {
        return NextResponse.json(
          { error: "The primary guest reference could not be found." },
          { status: 404 }
        );
      }
    }

    const created = await sql<UserRow>`
      INSERT INTO users (name, gender, phone, email, is_companion, parent_user_id)
      VALUES (
        ${parsed.name},
        ${parsed.gender},
        ${parsed.phone ?? null},
        ${parsed.email ?? null},
        ${parsed.isCompanion},
        ${parsed.parentUserId ?? null}
      )
      RETURNING id
    `;

    return NextResponse.json({ userId: created[0]?.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "We could not save the registration at this time."
      },
      { status: 500 }
    );
  }
}
