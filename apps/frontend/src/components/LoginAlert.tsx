import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"

interface LoginAlertInterface {
    open: boolean, 
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginAlert = ({ open, onOpenChange } : LoginAlertInterface) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-slate-700 text-white">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute -top-0 right-4 text-white hover:text-gray-400 text-xl"
                    aria-label="Close"
                >
                    ×
                </button>
                <AlertDialogHeader>
                    <AlertDialogTitle>Email or password incorrect</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please try again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-800 border-0">Ok</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LoginAlert;