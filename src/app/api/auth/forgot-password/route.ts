import { PrismaClient } from "@/generated/prisma";
import crypto from "crypto";
import { sendPasswordResetMail } from "@/lib/resetpassMailer";

const prisma = new PrismaClient();

function generateToken(){
  return crypto.randomBytes(32).toString("hex");
}


export async function POST(req: Request){
  try{
    const {email}: {email:string} = await req.json();


    if(!email){
      return new Response(JSON.stringify({
        success:false,
        message:"Email is required"
      }),{status:400});


    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!emailRegex.test(email)){
      return new Response(JSON.stringify({
        success:false,
        message:"Email is required"
      }),{status:400});
    }
    const user = await prisma.user.findUnique({
      where:{email}
    });

    if(!user || !user.emailVerified){
      return new Response(JSON.stringify({
        success:true,
        message:"If your email exists you will recive a password reset link"
      }),{
        status:200
      });

    }

    const now = new Date();

    const resetToken = generateToken();

    if(user.resetToken && user.resetTokenIssuedAt){
      const tokenAgeMs = now.getTime() - new Date(user.resetTokenIssuedAt).getTime();
      const isStillValid = tokenAgeMs < 15*60*1000;


      if(isStillValid){
        return new Response(JSON.stringify({
          success:true,
          message:"Password reset email alredy esent . Please check you inbox"
        }),{
          status:200
        });
      }
    }


    await prisma.user.update({
      where:{email},
      data:{
        resetToken,
        resetTokenIssuedAt:now,
      },
    });


    await sendPasswordResetMail(email,"User",resetToken);
    return new Response(JSON.stringify({
      success:true,
      message:"If your email exist you will recive a password reset link."

    }),{status:200});


  }catch(e){
    console.error("Error in forgot password route:", e);
    return new Response(JSON.stringify({
      success:false,
      error:"something went wrong please try again after some time"
    }),{status:402})
  }finally{
    await prisma.$disconnect();
  }
}