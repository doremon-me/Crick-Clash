import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schema";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "@/api/auth.api";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const signinForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      number: "",
      password: "",
      name: "",
    },
  });

  const { mutate: signupFun } = useSignup();

  return (
    <Card className="min-w-[300px] w-96">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>You can create new account here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit((e) => signupFun(e))}
            className="w-full space-y-4"
          >
            <FormField
              control={signinForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="focus-visible:ring-0 border-white focus-visible:border-white"
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signinForm.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="focus-visible:ring-0 border-white focus-visible:border-white"
                      placeholder="Number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signinForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="focus-visible:ring-0 border-white focus-visible:border-white"
                      placeholder="Password"
                      onBlur={() => setShowPassword(false)}
                      onFocus={() => setShowPassword(true)}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Sign Up</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Separator />
        <div>
          Already have an account{" "}
          <Link to="/auth/signin" className="text-primary">
            Sign In?
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
