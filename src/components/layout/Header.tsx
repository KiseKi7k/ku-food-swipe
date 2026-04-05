"use client";

import Link from "next/link";
import { Utensils } from "lucide-react";
import { signOut, useSession } from "@/lib/authClient";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import SignInBtn from "../SignInBtn";

export function Header() {
	const { data } = useSession();
	const { session, user } = data || {};
	const router = useRouter();

	const returnHome = async () => {
		router.push("/");
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex flex-row items-center gap-4">
					<Link
						onClick={returnHome}
						href="/"
						className="flex items-center gap-2"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-200">
							<Utensils className="h-6 w-6" />
						</div>
						<span className="text-xl font-bold tracking-tight text-slate-900">
							KU <span className="text-green-600">Food</span> Swipe
						</span>
					</Link>
				</div>
				<div className="flex items-center gap-2">
					{session ? (
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium text-slate-900">
								{user?.name}
							</span>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="relative">
										<Image
											src={user?.image || "/avatar.png"}
											alt={user?.name || "User"}
											width={40}
											height={40}
											className="rounded-full"
										/>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuGroup>
										<DropdownMenuItem className="hover:bg-black/10 transition-all duration-200 ease-out">
											<Link href={`/user/${user?.id}`}>โปรไฟล์</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											className="text-red-500 focus:text-red-600 hover:bg-red-500/10 transition-all duration-200 ease-out"
											onClick={async () => {
												await signOut();
											}}
										>
											Signout
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<SignInBtn />
					)}
				</div>
			</div>
		</header>
	);
}
