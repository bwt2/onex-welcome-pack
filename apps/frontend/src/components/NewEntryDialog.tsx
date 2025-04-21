import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Label } from "./ui/label"
import { Input } from "./ui/input";
import { useUser } from "@/contexts/UserContext";
import { graphql } from "relay-runtime";
import { NewEntryDialogMutation as NewEntryDialogMutationType} from "./__generated__/NewEntryDialogMutation.graphql";
import { useMutation } from "react-relay";
import { useNavigate, NavigateFunction } from "react-router";

const NewEntryDialogMutation = graphql`
    mutation NewEntryDialogMutation($input: EntryInput!) {
        createEntry(input: $input) {
            id
        }
    }
`;

interface NewEntryDialogProps {
    selectedChallengeId: string | null,
}

const NewEntryDialog = ({ selectedChallengeId } : NewEntryDialogProps) => {
    const { user } = useUser();
    const [commitMutation, isMutationInFlight] = useMutation<NewEntryDialogMutationType>(NewEntryDialogMutation);
    const navigate: NavigateFunction = useNavigate();

    const handleAddEntry = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = formData.get("data") as string

        if (!selectedChallengeId || !user?.id) {
            console.error("Missing required fields");
            return;
        }

        const mutationInput = { 
            challengeId: selectedChallengeId!,
            data: { "Note": data }, 
            submissionTime: new Date().toISOString(),
            userId: user.id!
        };

        commitMutation({
            variables: { input: mutationInput },
            onCompleted(response: NewEntryDialogMutationType["response"], errors) {
              if (errors) { console.error("a"); } 
              else {
                navigate(0); // hack
              }
            },
            onError(error) { 
              console.error('Mutation error', error); 
            },
        });
    } 

    return (
        <Dialog>
        <DialogTrigger>
            <Button className="text-xl cursor-pointer mb-5">
                Add Entry
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-700 text-white">
            <DialogHeader>
            <DialogTitle>Create a new challenge entry</DialogTitle>
            <DialogDescription>
                This entry will be logged for user {user?.name} for challenge {selectedChallengeId}
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEntry}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data" className="text-right">
                        Data
                    </Label>
                    <Input
                        id="data"
                        className="col-span-3"
                        name="data"
                        required
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" disabled={isMutationInFlight}>
                    {isMutationInFlight ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}

export default NewEntryDialog;