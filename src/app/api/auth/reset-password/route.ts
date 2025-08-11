import { PrismaClient } from "@/generated/prisma";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, password }: { token: string; password: string } = await req.json();

    if (!token || !password) {
      return new Response(JSON.stringify({
        success: false,
        message: "Token and Password are required"
      }), {
        status: 400
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({
        success: false,
        message: "Password must be at least 8 characters"
      }), {
        status: 400
      });
    }

    // First, find the user with the reset token
    const user = await prisma.user.findFirst({
      where: { resetToken: token }
    });

    if (!user || !user.resetTokenIssuedAt) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid or expired reset token"
      }), {
        status: 400
      });
    }

    // Check if the new password is the same as the current password
    const isSamePassword = await compare(password, user.password || "");
    if (isSamePassword) {
      return new Response(JSON.stringify({
        success: false,
        message: "New password cannot be the same as the old password"
      }), {
        status: 400
      });
    }

    const now = new Date();
    const tokenAgeMs = now.getTime() - new Date(user.resetTokenIssuedAt).getTime();
    const isExpired = tokenAgeMs > 15 * 60 * 1000;

    if (isExpired) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenIssuedAt: null,
        },
      });

      return new Response(JSON.stringify({
        success: false,
        message: "Reset token has expired. Please request a new one."
      }), { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenIssuedAt: null,
      },
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Password reset successfully. You can now login with your new password."
    }), { status: 200 });

  } catch (e) {
    console.error("Reset password error:", e);
    return new Response(JSON.stringify({
      success: false,
      message: "Something went wrong. Please try again."
    }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}