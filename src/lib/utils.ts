import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const showError = (msg: string) => toast.error(msg);

export function collectMessages(x: any): string[] {
  if (x?.response?.data?.errors && typeof x.response.data.errors === 'object') {
    return Object.values(x.response.data.errors).flatMap((err: any) =>
      Array.isArray(err) ? err : [err]
    );
  }

  if (x?.response?.data?.message) {
    return [x.response.data.message];
  }
  return ["Terjadi kesalahan pada server. Silakan coba lagi."];
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateWithDayName(dateString: string) {
  const date = new Date(dateString);
  const hari = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
  ];
  const dayName = hari[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const monthName = date.toLocaleDateString("id-ID", { month: "long" });
  const year = date.getFullYear();
  return `${dayName}, ${day} ${monthName} ${year}`;
}