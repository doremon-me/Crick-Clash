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
import { signinSchema } from "@/lib/schema";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignin } from "@/api/auth.api";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const signinForm = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      number: "",
      password: "",
    },
  });

  const { mutate: SinginFun } = useSignin();

  return (
    <Card className="min-w-[300px] w-96">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>You can singin here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signinForm}>
          <form
            onSubmit={signinForm.handleSubmit((e) => SinginFun(e))}
            className="w-full space-y-4"
          >
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
            <Button className="w-full">Sign In</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Separator />
        <div>
          Create an account{" "}
          <Link to="/auth/signup" className="text-primary">
            Sign Up?
          </Link>
        </div>
        <Link to="/auth/forget">Forget Password</Link>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
