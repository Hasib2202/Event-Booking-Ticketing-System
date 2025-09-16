// src/app/api/auth/register/route.ts
import { NextRequest } from 'next/server';
import connectDB from '@/lib/database/mongodb';
import User from '@/models/User';
import { registerSchema } from '@/lib/utils/validation';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);
    
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return errorResponse('User already exists with this email', 409);
    }
    
    // Create new user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: 'user',
    });
    
    await user.save();
    
    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    return successResponse(userResponse, 'User created successfully', 201);
    
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    
    return errorResponse('Internal server error', 500);
  }
}