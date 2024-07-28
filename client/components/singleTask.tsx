import { useEffect } from "react";
import { Task } from "../../types/task";
import { db } from "../utils/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

export const SingleTask: React.FC<Task> = ({ title, detail, color, id }) => {
  useEffect(() => {
    const docRef = doc(db, "tasks", id);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        console.log("prathamesh", doc.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe(); // Cleanup function to detach listener
  }, []);

  return (
    <div
      className="grid w-full rounded-lg shadow-md p-8"
      style={{ backgroundColor: color }}
    >
      <p className="text-xl font-bold">{title}</p>
      <p className="mt-4 text-sm">{detail}</p>
    </div>
  );
};
