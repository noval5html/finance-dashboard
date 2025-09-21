import { db } from "@/server/db";
import { budget } from "@/server/db/schemas";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth";

const budgetSchema = z.object({
  category: z.string().min(1),
  limitAmount: z.string(),
  period: z.string().min(1), // e.g., "monthly", "weekly"
});

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const budgets = await db
      .select()
      .from(budget)
      .where(eq(budget.userId, session.user.id))
      .orderBy(budget.category);

    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching budgets:", error);
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
    const validatedData = budgetSchema.parse(body);

    const newBudget = await db
      .insert(budget)
      .values({
        userId: session.user.id,
        category: validatedData.category,
        limitAmount: validatedData.limitAmount,
        period: validatedData.period,
      })
      .returning();

    return new Response(JSON.stringify(newBudget[0]), {
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

    console.error("Error creating budget:", error);
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
      return new Response("Missing budget ID", { status: 400 });
    }

    const body = await req.json();
    const validatedData = budgetSchema.parse(body);

    const updatedBudget = await db
      .update(budget)
      .set({
        category: validatedData.category,
        limitAmount: validatedData.limitAmount,
        period: validatedData.period,
      })
      .where(
        and(eq(budget.id, parseInt(id)), eq(budget.userId, session.user.id)),
      )
      .returning();

    if (updatedBudget.length === 0) {
      return new Response("Budget not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedBudget[0]), {
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

    console.error("Error updating budget:", error);
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
      return new Response("Missing budget ID", { status: 400 });
    }

    const deletedBudget = await db
      .delete(budget)
      .where(
        and(eq(budget.id, parseInt(id)), eq(budget.userId, session.user.id)),
      )
      .returning();

    if (deletedBudget.length === 0) {
      return new Response("Budget not found", { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
