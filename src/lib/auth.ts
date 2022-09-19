import { createClient } from "@supabase/supabase-js";
import create from "zustand";
import { persist } from "zustand/middleware";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(url, key);

interface AuthState {
  user: any;
  session: any;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      login: async (email, password) => {
        try {
          const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
          });
          if (error) throw error;
          set({ user, session });
        } catch (error) {
          return error;
        }
      },
      register: async (email, password) => {
        try {
          const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          console.log(user);
          set({ user, session });
        } catch (error) {
          return error;
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          set({ user: null, session: null });
        } catch (error) {
          return error;
        }
      },
    }),
    {
      name: "auth",
      getStorage: () => localStorage,
    },
  ),
);
