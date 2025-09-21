import { db } from "@/server/db";
import { transaction } from "@/server/db/schemas";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { z } from "zod";

const transactionSchema = z.object({
  amount: z.string(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1),
  date: z.string().datetime(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const transactions = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userId, session.user.id))
      .orderBy(transaction.date);

    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
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
    const validatedData = transactionSchema.parse(body);

    const newTransaction = await db
      .insert(transaction)
      .values({
        userId: session.user.id,
        amount: validatedData.amount,
        type: validatedData.type,
        category: validatedData.category,
        date: new Date(validatedData.date),
        description: validatedData.description,
      })
      .returning();

    return new Response(JSON.stringify(newTransaction[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", details: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Error creating transaction:", error);
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
      return new Response("Missing transaction ID", { status: 400 });
    }

    const body = await req.json();
    const validatedData = transactionSchema.parse(body);

    const updatedTransaction = await db
      .update(transaction)
      .set({
        amount: validatedData.amount,
        type: validatedData.type,
        category: validatedData.category,
        date: new Date(validatedData.date),
        description: validatedData.description,
      })
      .where(and(eq(transaction.id, parseInt(id)), eq(transaction.userId, session.user.id)))
      .returning();

    if (updatedTransaction.length === 0) {
      return new Response("Transaction not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedTransaction[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", details: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("Error updating transaction:", error);
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
      return new Response("Missing transaction ID", { status: 400 });
    }

    const deletedTransaction = await db
      .delete(transaction)
      .where(and(eq(transaction.id, parseInt(id)), eq(transaction.userId, session.user.id)))
      .returning();

    if (deletedTransaction.length === 0) {
      return new Response("Transaction not found", { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}