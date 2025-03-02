import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Route = createLazyFileRoute("/login")({
	component: Login,
});

const formSchema = z.object({
	username: z.string({ required_error: "Username is required" }).min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string({ required_error: "Password is required" }).min(2, {
		message: "Password must be at least 2 characters.",
	}),
});

function Login() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-full h-full grid lg:grid-cols-2 p-4">
				<div className="max-w-xs m-auto w-full flex flex-col items-center">
					<p className="mt-4 text-xl font-bold tracking-tight">Login</p>
					<Form {...form}>
						<form
							className="w-full space-y-4"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								name="username"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="w-full"
												placeholder="Username"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="password"
												className="w-full"
												placeholder="Password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="mt-4 w-full">
								Login
							</Button>
						</form>
					</Form>
					<div className="mt-5">
						<p className="text-sm text-center">
							Don&apos;t have an account?
							<Link
								to="/register"
								className="ml-1 underline text-muted-foreground"
							>
								Create account
							</Link>
						</p>
					</div>
				</div>
				<div className="bg-muted hidden lg:block rounded-lg" />
			</div>
		</div>
	);
}
