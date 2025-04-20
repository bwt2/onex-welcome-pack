import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { graphql, useMutation } from "react-relay";
import type { LoginFormMutation as LoginFormMutationType } from './__generated__/LoginFormMutation.graphql';
import LoginAlert from "@/components/LoginAlert"
import { useNavigate, NavigateFunction } from "react-router"
import { useUser } from "@/contexts/UserContext"
import { UserContextType } from "@/contexts/UserContext"
import { Toaster } from "@/components/ui/sonner"
import SignupButton from "@/components/SignupButton"
import { toast } from "sonner";

const LoginFormMutation = graphql`
  mutation LoginFormMutation($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
      homeGym {
        id
      }
    }
  }
`;

interface formData { 
  email: string,
  password: string
}

const LoginForm = () => {
  const [commitMutation, isMutationInFlight] = useMutation<LoginFormMutationType>(LoginFormMutation);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { setUser }: UserContextType = useUser();
  const navigate: NavigateFunction = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;;
    const formData = new FormData(form);

    const mutationInput: formData = { 
      email: formData.get("email") as string, 
      password: formData.get("password") as string, 
    };

    commitMutation({
      variables: { input: mutationInput },
      onCompleted(response: LoginFormMutationType["response"], errors) {
        if (errors || !response.login) { setShowAlert(true); } 
        else {
          setUser({
            id: response.login.id,
            name: response.login.name,
            email: response.login.email,
            homeGymId: response.login.homeGym.id,
          });
          navigate("/home/my-account");
        }
      },
      onError(error) { 
        console.error('Mutation error', error); 
        toast("Failed to connect to server.");
      },
    });
  } 

  return (
    <>
    {showAlert && <LoginAlert open={showAlert} onOpenChange={setShowAlert}/>}
    <div className="flex flex-col flex-1 p-10">
      <CardHeader>
        <CardTitle className="text-5xl pb-10">Onex Welcome</CardTitle>
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription className="pb-5">Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} > 
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email" 
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button disabled={isMutationInFlight} type="submit" className="w-full">
                {isMutationInFlight ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <SignupButton/>
          </div>
        </form>
      </CardContent>
    </div>
    <Toaster
        toastOptions={{
            unstyled: true,
            classNames: {
              toast: "bg-slate-800 text-white border border-slate-700 rounded-lg shadow-lg p-2",
            }
        }}
    />
    </>
  )
}

export default LoginForm;