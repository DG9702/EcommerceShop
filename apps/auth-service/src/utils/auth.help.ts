import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "@packages/error-handler";
import redis from "@packages/libs/redis";
import { sendEmail } from "./sendMail";
import prisma from "@packages/libs/prisma";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  const { name, email, password, phone_number, country } = data;

  if (
    !name ||
    !email ||
    !password ||
    (userType === "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError("Missing required fields!");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format!");
  }
};

export const checkOtpRestrictions = async (
  email: string,
  next: NextFunction
) => {
  if (await redis.get(`otp_lock: ${email}`)) {
    return next(
      new ValidationError(
        "Account locked due to multiple failed  attempts! Try again after 30 minutes"
      )
    );
  }

  if (await redis.get(`otp_spam_lock: ${email}`)) {
    return next(
      new ValidationError(
        "Too many OTP requests! Please wait 1 hour  before requesting again."
      )
    );
  }

  if (await redis.get(`otp_coolDown: ${email}`)) {
    return next(
      new ValidationError("Please wait 1 minutes before requesting a new OTP!")
    );
  }
};

export const trackOtpRequests = async (email: string, next: NextFunction) => {
  const OtpRequestKey = `otp_request_count: ${email}`;

  let otpRequest = parseInt((await redis.get(OtpRequestKey)) || "0");

  if (otpRequest >= 2) {
    await redis.set(`otp_spam_lock: ${email}`, "locked", "EX", 3600); //lock for 1 hour
    return next(
      new ValidationError(
        "Too many OTP requests! Please wait 1 hour  before requesting again."
      )
    );
  }

  await redis.set(OtpRequestKey, otpRequest + 1, "EX", 3600);
};
export const sendOtp = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  await sendEmail(email, "Verify your email!", template, { name, otp });
  await redis.set(`otp: ${email}`, otp, "EX", 300);
  await redis.set(`otp_coolDown: ${email}`, "true", "EX", 60);
};

export const verifyOtp = async (
  email: string,
  otp: string,
  next: NextFunction
) => {
  const storedOtp = await redis.get(`otp: ${email}`);
  if (!storedOtp) {
    throw new ValidationError("Invalid or expired OTP!");
  }

  const failedAttemptsKey = `otp_attempts: ${email}`;
  const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0");

  if (storedOtp !== otp) {
    if (failedAttempts >= 2) {
      await redis.set(`otp_attempts: ${email}`, "locked", "EX", 1800);
      await redis.del(`otp: ${email}`, failedAttemptsKey);
      throw new ValidationError(
        "Too many failed attempts. Your account is locked for 30 minutes!"
      );
    }

    await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300);
    throw new ValidationError(
      `Incorrect OTP. ${2 - failedAttempts} attempts left.`
    );
  }

  await redis.del(`otp: ${email}`, failedAttemptsKey);
};

//forgot password
export const handleForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userType: "user" | "seller"
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ValidationError("Email is required!");
    }

    const user =
      userType === "user" &&
      (await prisma.users.findUnique({ where: { email } }));

    if (!user) throw new ValidationError(`${userType} not found!`);
    //check otp restriction
    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);

    //Generate OTP send email
    await sendOtp(user.name, email, "forgot-password-user-mail");

    res.status(200).json({
      message: "OTP sent to email. Please verify your account.",
    });
  } catch (error) {}
};

export const verifyForgotPasswordOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ValidationError("Email and Otp are required!");
    }

    await verifyOtp(email, otp, next);

    res.status(200).json({
      message: "OTP verified. You can now reset your password!",
    });
  } catch (error) {}
};
