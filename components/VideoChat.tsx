// "use client";

// import { useState } from "react";
//  import { Button } from "./ui/button";
// import { useParams } from "next/navigation";
// import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'


// // import { Dialog,
// //     DialogContent,
// //     DialogDescription,
// //     DialogHeader,
// //     DialogTitle,
// //     DialogTrigger,
// // } from "@/components/ui/dialog";

// import { useToast } from "./ui/use-toast";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import useAdminId from "@/hooks/useAdminId";
// import { PlusCircleIcon } from "lucide-react";

// function VideoChat({chatId}: {chatId: string}) {
//     const { data: session } = useSession();
//     const [open, setOpen] = useState(false);
//     const {toast} = useToast();
//     const router = useRouter();
//     const adminId = useAdminId({ chatId });
   
   
//     const RoomPage = () => {
//         const {roomId} = useParams();
        
//         const myMeeting = async (element: any) => {
//             const appID = 169780351;
//             const serverSecret ="ea12f61f9cf42c973975f01df90d2110";
//             const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, chatId, Date.now().toString(), "Priyanshi" );
//             const zc = ZegoUIKitPrebuilt.create(kitToken);
//             zc.joinRoom({
//                 container: element,
//                 sharedLinks: [
//                     {
//                         name: 'Copy Link',
//                         url: `http://localhost:3000/room/${chatId}`,
//                     },
//                 ],
//                 scenario: {
//                     mode: ZegoUIKitPrebuilt.OneONoneCall,
//                 },
//                 showScreenSharingButton: false,
//             });
//         };
    
// //  const handleCall = async () => {
// //     toast({
// //         title: "Calling your friend",
// //         description: "please wait while we call them...",
// //     });
// //     console.log("Calling :: ", chatId);

// //     await fetch("/api/chat/delete", {
// //         method: "DELETE",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ chatId: chatId }),
// //     }).then((res) => {
// //         toast({
// //             title: "success",
// //             description: "your chat has been deleted!",
// //             className: "bg-green-600 text-white",
// //             duration: 3000,
// //         });
// //         router.replace(`/chat`);
// //     }).catch((err) => {
// //         console.error(err.message);

// //         toast({
// //             title: "error",
// //             description: "there was an error deleting your chat!",
// //             variant: "destructive",
// //         });
// //     })
// //     .finally(() => setOpen(false));
// //  }; 

//   return session?.user.id === adminId && (
// <>
//     <Button>
//     <PlusCircleIcon className="mr-1" />
//     Add user to chat
// </Button>

//     <div>
//     <div ref={myMeeting} />
// </div>
// </>
//      )
//   };
// };

// export default VideoChat;