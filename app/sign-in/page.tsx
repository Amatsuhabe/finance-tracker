'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { SignInFormData, signInSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function SignIn() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const router = useRouter()

  const onSumbmit = async (formData: SignInFormData) => {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/")
        }
      }
    )
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="space-y-8 max-w-sm w-full">
        <div className="flex flex-col gap-2 items-center">
          <div className="bg-primary text-primary-foreground p-3 rounded-xl">
            <TrendingUp size={24}></TrendingUp>
          </div>

          <div className="text-2xl font-bold tracking-tight">Finio</div>

          <div className="text-sm text-muted-foreground">Your personal finance tracker</div>
        </div>

        <form onSubmit={handleSubmit(onSumbmit)} className="p-6 rounded-xl border border-border bg-card">
          <div className="mb-5 text-lg font-semibold">Sign in</div>

          <div className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input {...field} id="email" type="email" placeholder="you@example.com" ></Input>
                  {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
                </div>
              )}>
            </Controller>

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input {...field} id="password" type="password" placeholder="••••••••" ></Input>
                  {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
                </div>
              )}>
            </Controller>

            <Button type="submit" className="w-full">Sign in</Button>
          </div>

          <Separator className="my-5"></Separator>

          <div className="text-center text-muted-foreground text-sm">Don&apos;t have an account? <Link href={"/sign-up"} className="font-semibold text-primary hover:underline">Sign up</Link></div>
        </form>
      </div>
    </div>
  )
}