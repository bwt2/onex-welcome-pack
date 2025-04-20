import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const SignupButton = () => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const showSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDialog(true);
    }

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDialog(false);
        toast("Account Successfully Created.")
    }

    return (
        <>
            <Button onClick={showSignup} variant="ghost" className="ml-1 mr-1 underline underline-offset-4">Sign up</Button>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="bg-slate-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Sign Up</DialogTitle>
                        <DialogDescription>
                        Sign up for a free account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input 
                                id="name" 
                                placeholder="Your display name here" 
                                className="col-span-3" 
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input 
                                id="email"
                                name="email" 
                                type="email"
                                placeholder="Your email here"
                                className="col-span-3" 
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                            Password
                            </Label>
                            <Input 
                                id="password" 
                                name="password"
                                type="password" 
                                placeholder="Your password here"
                                className="col-span-3" 
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSignup} className="bg-slate-800 border-0">Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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

export default SignupButton;