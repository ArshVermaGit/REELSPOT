import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { API_CONFIG } from "@/config/api";
import GoogleProvider from "next-auth/providers/google";

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
    const settings = await prisma.userSettings.findUnique({
      // @ts-expect-error session.user.id is not indexable
      where: { userId: session.user.id },
    });

    if (!settings) {
      // Create default settings if they don't exist
      const newSettings = await prisma.userSettings.create({
        data: {
          // @ts-expect-error session.user.id is not indexable
          userId: session.user.id,
        },
      });
      return NextResponse.json(newSettings);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Remove ID or other sensitive fields that shouldn't be overwritten manually
    const { id, userId, ...updateData } = data;

    const settings = await prisma.userSettings.upsert({
      // @ts-expect-error session.user.id is not indexable
      where: { userId: session.user.id },
      update: updateData,
      create: {
        // @ts-expect-error session.user.id is not indexable
        userId: session.user.id,
        ...updateData,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
