"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import * as z from "zod";

import {getDocs, serverTimestamp, setDoc} from 'firebase/firestore';
import {addChatRef, chatMembersRef} from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {getUserByEmailRef} from "@/lib/converters/User";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import ShareLink from "./ShareLink";

const formSchema = z.object({
    email:z.string().email("please enter a valid email"),
});

function InviteUser({ chatId}: {chatId: string}) {
    const { data: session} = useSession();
    const {toast} = useToast();
    const adminId = useAdminId({chatId});
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
    },
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user.id) return;

    toast({
        title: "sending invite",
        description: "please wait while we send the invite",
    });

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map(
        (doc) => doc.data()
    ).length;

    const isPro =
    subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
        toast({
            title: "free plan limit exceeded",
            description: "you have exceeded the limit of users in a single chat for FREE plan , to continue adding users upgrade it to PRO!",
            variant: "destructive",
            action: (
                <ToastAction 
                altText="Upgrade"
                onClick={() => router.push("/register")}
                >Upgrade to PRO
                </ToastAction>
            ),
        });
        return;
    }

const querySnapshot = await getDocs(getUserByEmailRef(values.email));
  if (querySnapshot.empty) {
    toast({
        title: "user not found",
        description: "please enter an email of a registered user OR resent the invitation once they have signed up!",
        variant: "destructive",
    });
    return;
  } else {
     const user = querySnapshot.docs[0].data();
    await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
    }).then(() => {
        setOpen(false);

        toast({
            title: "added to chat",
            description: "the user has been added successfully",
            className: "bg-green-600 text-white",
            duration: 3000,
        });
        setOpenInviteLink(true);
    })
    .catch(() => {
        toast({
            title: "error",
            description: "whoops..error",
            variant: "destructive",
        });
        setOpen(false);
    });
  }

form.reset();
   }

  return (
    adminId === session?.user.id && (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircleIcon className="mr-1" />
                    Add user to chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add user to chat</DialogTitle>
                <DialogDescription>simply enter another users email to invite them to this chat!{" "}
                <span className="text-indigo-600 font-bold">
                    (Note: they must ne registered)
                </span>
                </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
                    >
                      <FormField 
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="john@doe.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                      )}
                      />
                      <Button className="ml-auto sm:w-fit w-full" type="submit">
                        Add to chat
                      </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

<ShareLink
 isOpen={openInviteLink}
 setIsOpen={setOpenInviteLink}
 chatId={chatId}
 />

        </>
    )
  );
}

export default InviteUser;