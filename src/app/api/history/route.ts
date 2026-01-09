import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { API_CONFIG } from "@/config/api";
import GoogleProvider from "next-auth/providers/google";

// Re-using the auth options logic or defining a minimal one for the session check
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: API_CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: API_CONFIG.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: API_CONFIG.nextAuthSecret,
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await prisma.downloadHistory.findMany({
      // @ts-expect-error session.user.id is not indexable
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, platform, url, thumbnail } = await req.json();

    const entry = await prisma.downloadHistory.create({
      data: {
        // @ts-expect-error session.user.id is not indexable
        userId: session.user.id,
        title,
        platform,
        url,
        thumbnail,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error creating history entry:", error);
    return NextResponse.json({ error: "Failed to create history entry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    if (clearAll) {
      await prisma.downloadHistory.deleteMany({
        // @ts-expect-error session.user.id is not indexable
        where: { userId: session.user.id },
      });
      return NextResponse.json({ message: "History cleared" });
    }

    if (id) {
      await prisma.downloadHistory.delete({
        where: { 
          id,
          // @ts-expect-error session.user.id is not indexable
          userId: session.user.id 
        },
      });
      return NextResponse.json({ message: "Entry deleted" });
    }

    return NextResponse.json({ error: "Missing ID or clearAll flag" }, { status: 400 });
  } catch (error) {
    console.error("Error deleting history:", error);
    return NextResponse.json({ error: "Failed to delete from history" }, { status: 500 });
  }
}
