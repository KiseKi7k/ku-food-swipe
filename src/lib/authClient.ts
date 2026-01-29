import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;

export const googleSignIn = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: "/",
  });
};
