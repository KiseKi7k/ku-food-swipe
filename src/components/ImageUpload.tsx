"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideImage, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Label } from "./ui/label";
import { getImageBase64 } from "@/lib/utils";

type ImageUploadProp = {
	image: Buffer<ArrayBuffer> | null;
	onImageChanged: (buffer: Buffer<ArrayBuffer> | null) => void;
};

export function ImageUpload({ image, onImageChanged }: ImageUploadProp) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		onImageChanged(buffer);

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="flex flex-col items-center flex-center gap-2">
			<Label className="flex">รูปภาพ</Label>
			<Card className="w-full min-h-64 max-w-md relative">
				<CardContent className="flex64 flex-col items-center gap-4 p-6">
					{image ? (
						<Image
							src={getImageBase64(image)}
							fill
							alt="Preview"
							className="h-48 w-full rounded-md object-cover"
						/>
					) : (
						<div className="flex flex-col text-sm h-48 w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
							<LucideImage size={64} />
							ไม่มีรูปภาพ
						</div>
					)}

					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
				</CardContent>
			</Card>
			<div className="flex gap-2 items-center mt-4">
				<Button
					type="button"
					onClick={handleClick}
					className="w-full bg-green-600 hover:bg-green-700 shadow-md shadow-green-200 transition-all duration-200 ease-out"
				>
					<Upload className="mr-2 h-4 w-4" />
					Upload Image
				</Button>
				{image && (
					<Button
						type="button"
						onClick={() => onImageChanged(null)}
						className="bg-red-500/70 hover:bg-red-500/90 border-2 border-red-500 text-white transition-all duration-200 ease-out"
					>
						<Trash />
					</Button>
				)}
			</div>
		</div>
	);
}
