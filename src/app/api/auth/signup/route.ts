import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

const prisma = new PrismaClient();

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: Request) {
  const { name, email, password }: { name: string; email: string; password: string } = await req.json();

  if (!name || !email || !password) {
    console.log('email : ',email,"password:",password);
    return new Response(JSON.stringify({ error: "Missing email , password or name" }), {
      
      status: 400,
    });
  }

  const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(email)){
    return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
  }
  if(password.length < 8){
    return new Response(JSON.stringify({error:"Password must be atleast 8 charecters"}),{status : 400});
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  const now = new Date();

  if (existingUser) {
    // If already verified, block registration
    if (existingUser.emailVerified === true) {
      return new Response(JSON.stringify({ error: "User already exists." }), { status: 400 });
    }

    // Unverified user: check if token expired
    const tokenIssuedAt = existingUser.verifyTokenIssuedAt ?? new Date(0);
    const tokenAgeMs = now.getTime() - new Date(tokenIssuedAt).getTime();
    const isExpired = tokenAgeMs > 60 * 60 * 1000; // 1 hour

    if (isExpired) {
      const newToken = generateToken();

      await prisma.user.update({
        where: { email },
        data: {
          verifyToken: newToken,
          verifyTokenIssuedAt: now,
        },
      });

      try {
        await sendVerificationEmail(email, name, newToken);
        return new Response(JSON.stringify({ error: "Verification link expired. New email sent." }), {
          status: 400,
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to resend verification email." }), {
          status: 500,
        });
      }
    }

if (existingUser.verifyToken) {
  await sendVerificationEmail(email, name, existingUser.verifyToken);
} else {
  return new Response(JSON.stringify({ error: "Verification token is missing. Please register again." }), {
    status: 500,
  });
}


    return new Response(JSON.stringify({ error: "Please verify your email. " }), {
      status: 400,
    });
  }

  // Register new user
  const hashedPassword = await hash(password, 12);
  const verifyToken = generateToken();

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        provider: "credentials",
        verifyToken,
        verifyTokenIssuedAt: now,
      },
    });

    await sendVerificationEmail(email, name, verifyToken);
    console.log("Verification email sent to:", email);

    return Response.json({ success: true, message: "Check your email to verify your account." });
  } catch (error) {
    console.error("Error creating user or sending email:", error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
  }
}
