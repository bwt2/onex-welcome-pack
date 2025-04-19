import LoginForm from "@/components/LoginForm";
import LoginDecor from "@/components/LoginDecor";
import {
    Card,
  } from "@/components/ui/card"

const Login = () => {
    return (
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-slate-800">
            <Card className="bg-slate-700 text-white flex flex-row min-w-3/4 min-h-[75vh] overflow-hidden relative">
                <div className="w-1/2 h-full"/>
                <div className="w-1/2 h-full self-center justify-center">
                    <LoginForm />
                </div>
                <LoginDecor />
            </Card>
        </main>
    )
}

export default Login;