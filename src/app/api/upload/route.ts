// src/app/api/upload/route.ts
import { NextRequest } from 'next/server';
import { uploadImage } from '@/lib/utils/cloudinary';
import { successResponse, errorResponse } from '@/lib/utils/response';
import { requireAdmin } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication for image upload
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return errorResponse('No image file provided', 400);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return errorResponse('File must be an image', 400);
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return errorResponse('File size must be less than 5MB', 400);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadImage(buffer, 'events');

    return successResponse({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
    }, 'Image uploaded successfully');

  } catch (error: any) {
    console.error('Image upload error:', error);

    if (error.message === 'Admin access required') {
      return errorResponse('Admin access required', 403);
    }

    return errorResponse('Failed to upload image', 500);
  }
}