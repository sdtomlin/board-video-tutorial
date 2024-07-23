import { Skeleton } from "@/components/ui/skeleton";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-[80px] w-[80px] rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-[40px] w-[250px]" />
                    <Skeleton className="h-[40px] w-[200px]" />
                </div>
            </div>
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to Board
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an organisation to get started
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create Organisation
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <CreateOrganization routing="hash" />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};