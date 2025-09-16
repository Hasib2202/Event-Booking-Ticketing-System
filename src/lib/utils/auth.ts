// src/lib/utils/auth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { NextRequest } from 'next/server';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

// Helper to extract user from request in API routes
export async function getUserFromRequest(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    return session?.user || null;
  } catch (error) {
    return null;
  }
}