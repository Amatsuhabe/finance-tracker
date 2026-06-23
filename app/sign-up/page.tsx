'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { SignUpFormData, signUpSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function SignUp() {
  const { handleSubmit, control, reset, formState } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
  console.log(formState)
  const onSumbmit = async (formData: SignUpFormData) => {
    const data = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.firstName,
      lastName: formData.lastName
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

    console.log({data})
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="space-y-8 max-w-sm w-full">
        <div className="flex flex-col gap-2 items-center">
          <div className="bg-primary text-primary-foreground p-3 rounded-xl">
            <TrendingUp size={24}></TrendingUp>
          </div>

          <div className="text-2xl font-bold tracking-tight">Finio</div>

          <div className="text-sm text-muted-foreground">Start tracking your finances</div>
        </div>

        <form onSubmit={handleSubmit(onSumbmit)} className="p-6 rounded-xl border border-border bg-card">
          <div className="mb-5 text-lg font-semibold">Create account</div>

          <div className="space-y-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="text">First name</Label>
                  <Input {...field} id="text" type="text" placeholder="John" ></Input>
                  {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
                </div>
              )}>
            </Controller>

            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="text">Last name</Label>
                  <Input {...field} id="text" type="text" placeholder="Doe" ></Input>
                  {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
                </div>
              )}>
            </Controller>

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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input {...field} id="confirmPassword" type="password" placeholder="••••••••" ></Input>
                  {fieldState.error && <p className="text-xs text-destructive">{fieldState.error.message}</p>}
                </div>
              )}>
            </Controller>

            <Button type="submit" className="w-full">Create account</Button>
          </div>

          <Separator className="my-5"></Separator>

          <div className="text-center text-muted-foreground text-sm">Already have an account? <Link href={"/sign-in"} className="font-semibold text-primary hover:underline">Sign in</Link></div>
        </form>
      </div>
    </div>
  )
}