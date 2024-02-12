import Google from '@auth/core/providers/google';
import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';

export default defineConfig({
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }){

      if (token) {
        //@ts-ignore
        session.accessToken = token.accessToken
        //@ts-ignore
        session.user_id = Number(token.sub);
      }

      return session;
    },
    async jwt({ token, account, profile }) {

      if (account) {
        token.accessToken = account.access_token
      }

      if (profile) {
        token.githubBio = profile.bio;
      }

      return token
    },
  },
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_ID,
      clientSecret: import.meta.env.GOOGLE_SECRET
    }),
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET
    })
  ]
})