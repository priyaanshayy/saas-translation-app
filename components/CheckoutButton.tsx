"use client";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import LoadingSpinner from './LoadingSpinner';
import { useSubscriptionStore } from '@/store/store';
import ManageAccountButton from './ManageAccountButton';


function CheckoutButton() {
    const { data: session } = useSession();
    const [loading , setLoading] = useState(false);

    const subscription = useSubscriptionStore((state) => state.subscription);
     
     const isLoadingSubscription = subscription === undefined;

    const isSubscribed =
      subscription?.status === "active" && subscription?.role === "pro";


const createCheckoutSession = async () => {
    if(!session?.user.id) return ;
   
setLoading(true)
const docRef = await addDoc(
  collection(db, 'customers', session.user.id, 'checkout_sessions'),
  {
  price: "price_1OBvoSSFswTNuqzt8jEbyZsH",
  success_url: window.location.origin,
  cancel_url: window.location.origin,
}
);

return onSnapshot(docRef, (snap) => {
  const data = snap.data();
  const url = data?.url;
  const error = data?.error;

  if(error) {
      
    alert(`an error: ${error.message}`);
    setLoading(false);
  }

  if(url) {
    window.location.assign(url);
    setLoading(false);
  }
});

};

  return (
    <div className="flex flex-col space-y-2">
    <div className="mt-8 block rounded-md bg-indigo-600 px-10 py-4 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer
    disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default"
    >

{isSubscribed ? (
    <ManageAccountButton />
) : isLoadingSubscription || loading ?  ( 
<LoadingSpinner />
)  : (
  <button onClick={() => createCheckoutSession()}>Sign Up</button>
)}

    </div>
    </div>
  );
} 

export default CheckoutButton;