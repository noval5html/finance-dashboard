import { db } from "@/server/db";
import { asset } from "@/server/db/schemas";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { z } from "zod";

const assetSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["property", "vehicle", "investment", "other"]),
  currentValue: z.string(),
  acquisitionDate: z.string().datetime(),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const assets = await db
      .select()
      .from(asset)
      .where(eq(asset.userId, session.user.id))
      .orderBy(asset.acquisitionDate);

    return new Response(JSON.stringify(assets), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching assets:", error);
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
    const validatedData = assetSchema.parse(body);

    const newAsset = await db
      .insert(asset)
      .values({
        userId: session.user.id,
        name: validatedData.name,
        type: validatedData.type,
        currentValue: validatedData.currentValue,
        acquisitionDate: new Date(validatedData.acquisitionDate),
        description: validatedData.description,
      })
      .returning();

    return new Response(JSON.stringify(newAsset[0]), {
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

    console.error("Error creating asset:", error);
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
      return new Response("Missing asset ID", { status: 400 });
    }

    const body = await req.json();
    const validatedData = assetSchema.parse(body);

    const updatedAsset = await db
      .update(asset)
      .set({
        name: validatedData.name,
        type: validatedData.type,
        currentValue: validatedData.currentValue,
        acquisitionDate: new Date(validatedData.acquisitionDate),
        description: validatedData.description,
      })
      .where(and(eq(asset.id, parseInt(id)), eq(asset.userId, session.user.id)))
      .returning();

    if (updatedAsset.length === 0) {
      return new Response("Asset not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedAsset[0]), {
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

    console.error("Error updating asset:", error);
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
      return new Response("Missing asset ID", { status: 400 });
    }

    const deletedAsset = await db
      .delete(asset)
      .where(and(eq(asset.id, parseInt(id)), eq(asset.userId, session.user.id)))
      .returning();

    if (deletedAsset.length === 0) {
      return new Response("Asset not found", { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}