import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const UserCheck = () => {
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      // Call the API route to check if the user exists
      axios
        .get("/api/user/check")
        .then((response) => {
          console.log("User exists:", response.data);
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            console.log("User does not exist");
          } else {
            console.error("Error checking user:", error);
          }
        });
    }
  }, [userId]);

  return null; // or a loading state, or a message based on the check result
};

export default UserCheck;
