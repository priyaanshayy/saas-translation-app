
import { db } from "@/firebase";

import{
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    collection,
    where,
    query,
} from "firebase/firestore";

import { User } from "next-auth";

const userConverter: FirestoreDataConverter<User> = {
    toFirestore: function (customer: User): DocumentData {
        return{
          email: customer.email,
          image: customer.image,
          name: customer.name,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): User {
        const data = snapshot.data(options);     

        return{
            id: snapshot.id,
            email: data.email,
            image: data.image,
            name: data.name,
        };
    },
};


export const getUserByEmailRef = (email: string) =>
query(collection(db, "users"), where("email", "==", email)).withConverter(
    userConverter
);

// export const messagesRef = (chatId: string) => 
//   collection(db, "chats", chatId, "messages").withConverter(messageConverter);

// export const limitedMessagesRef = (chatId: string) =>
//   query(messagesRef(chatId), limit(25));

// export const sortedMessagesRef = (chatId: string) =>
//   query(messagesRef(chatId), orderBy("timestamp","asc"));

// export const limitedSortedMessagesRef = (chatId: string) =>
//   query(query(messagesRef(chatId), limit(1)), orderBy("timestamp","desc"));
  