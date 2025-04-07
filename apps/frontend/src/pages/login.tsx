import { Layout } from "../components/layout"
import { Header } from "../components/header" 
import { graphql, useMutation } from "react-relay";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import type { loginMutation as loginMutationType } from './__generated__/loginMutation.graphql';
import { useNavigate } from "react-router";
import { useUser } from "@/context/UserContext";

const loginMutation = graphql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      userId
      name
      email
    }
  }
`;

function Login() {
  return (
    <Layout>
      <Header>
        <></>
      </ Header>
      <LoginForm className="px-50 py-50"/>
    </Layout>
  )
}

function LoginForm({className, ...props}: React.ComponentProps<"div">) {
  const [commitMutation, isMutationInFlight] = useMutation(loginMutation);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const userContext = useUser();
  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { setUser } = userContext;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    commitMutation({
      variables: {
        input: {
          email: form.email,
          password: form.password,
        },
      },
      onCompleted(response: loginMutationType["response"], errors) {
        if (errors || !response.login) {
          alert("wrong")
        } else {
          setUser({
            ...response.login,
            userId: Number(response.login.userId),
          });
          navigate("/home");
        }
      },
      onError(error) {
        console.error('Mutation error', error);
      },
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-slate-700 text-white border-0">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={form.email} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={form.password} onChange={handleChange}  required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isMutationInFlight}>
                  {isMutationInFlight ? "Logging In..." : "Log In"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
 
export default Login