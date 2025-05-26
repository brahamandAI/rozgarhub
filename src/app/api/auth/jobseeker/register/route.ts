import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      fullName,
      phone,
      currentJobTitle,
      yearsOfExperience,
      education,
      skills,
      city,
      state,
      country,
    } = body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.jobSeeker.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new job seeker
    const jobSeeker = await prisma.jobSeeker.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        currentJobTitle,
        yearsOfExperience,
        education,
        skills: skills ? skills.split(',').map((skill: string) => skill.trim()) : [],
        city,
        state,
        country,
        profileComplete: false,
        emailVerified: false,
        phoneVerified: false,
      },
    });

    // Remove password from response
    const { password: _, ...jobSeekerWithoutPassword } = jobSeeker;

    return NextResponse.json(
      {
        message: "Registration successful",
        user: jobSeekerWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error creating account" },
      { status: 500 }
    );
  }
} 