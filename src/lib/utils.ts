import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const bytesToBase64 = (buffer: Buffer | Uint8Array): string => {
	return Buffer.from(buffer).toString("base64");
};

export const getImageBase64 = (image: Buffer | Uint8Array): string => {
	return `data:image/jpeg;base64,${bytesToBase64(image)}`;
};
