import { db } from "@/server/db";
import { investment } from "@/server/db/schemas";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth";

const investmentSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["stock", "mutual_fund", "crypto", "bond", "other"]),
  amount: z.string(),
  purchaseDate: z.string().datetime(),
  currentValue: z.string(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const investments = await db
      .select()
      .from(investment)
      .where(eq(investment.userId, session.user.id))
      .orderBy(investment.purchaseDate);

    return new Response(JSON.stringify(investments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching investments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = investmentSchema.parse(body);

    const newInvestment = await db
      .insert(investment)
      .values({
        userId: session.user.id,
        name: validatedData.name,
        type: validatedData.type,
        amount: validatedData.amount,
        purchaseDate: new Date(validatedData.purchaseDate),
        currentValue: validatedData.currentValue,
      })
      .returning();

    return new Response(JSON.stringify(newInvestment[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.error("Error creating investment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing investment ID", { status: 400 });
    }

    const body = await req.json();
    const validatedData = investmentSchema.parse(body);

    const updatedInvestment = await db
      .update(investment)
      .set({
        name: validatedData.name,
        type: validatedData.type,
        amount: validatedData.amount,
        purchaseDate: new Date(validatedData.purchaseDate),
        currentValue: validatedData.currentValue,
      })
      .where(
        and(
          eq(investment.id, parseInt(id)),
          eq(investment.userId, session.user.id),
        ),
      )
      .returning();

    if (updatedInvestment.length === 0) {
      return new Response("Investment not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedInvestment[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.error("Error updating investment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response("Missing investment ID", { status: 400 });
    }

    const deletedInvestment = await db
      .delete(investment)
      .where(
        and(
          eq(investment.id, parseInt(id)),
          eq(investment.userId, session.user.id),
        ),
      )
      .returning();

    if (deletedInvestment.length === 0) {
      return new Response("Investment not found", { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting investment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
