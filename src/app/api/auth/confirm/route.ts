import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { verifyToken: token },
  });

  if (!user) {
    return new Response("Invalid token", { status: 400 });
  }

  const now = new Date();
 const tokenAgeMs = now.getTime() - new Date(user.verifyTokenIssuedAt).getTime();
const isExpired = tokenAgeMs > 24 * 60 * 60 * 1000;

  if (isExpired) {
    return new Response("Token expired", { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verifyToken: null,
    },
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
