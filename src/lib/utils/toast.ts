import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  description?: string;
}

export const toast = ({ variant = 'default', title, description }: ToastOptions) => {
  const message = title || description || '';
  const fullMessage = title && description ? `${title}: ${description}` : message;

  switch (variant) {
    case 'destructive':
      return sonnerToast.error(fullMessage);
    case 'success':
      return sonnerToast.success(fullMessage);
    default:
      return sonnerToast(fullMessage);
  }
};

// For direct usage without wrapper
export { toast as sonnerToast } from 'sonner';