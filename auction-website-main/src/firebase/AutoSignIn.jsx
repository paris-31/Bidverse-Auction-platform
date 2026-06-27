import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "./config";

export const AutoSignIn = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user && user.displayName) {

        console.log("Signed in user:", user.displayName);

        setUser(user);

        // ADMIN CHECK
        const adminNames = ["perry", "admin"];

        if (
          adminNames.includes(user.displayName.toLowerCase())
        ) {
          console.log("Admin detected");
          setAdmin(true);
        } else {
          setAdmin(false);
        }

      } else {
        signInAnonymously(auth);
      }
    });

    return () => unsubscribe();

  }, []);

  return { user, admin };
};
