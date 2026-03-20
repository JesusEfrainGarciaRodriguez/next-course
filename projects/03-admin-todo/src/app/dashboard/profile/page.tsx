'use client'

import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data:session, status } = useSession();
  
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (status === "unauthenticated") {
      return <div>You are not authenticated.</div>;
    }
  
    return (
      <div>
        <h1>session: {JSON.stringify(session)}</h1>
        <h2>status: {status}</h2>
      </div>
    );
}