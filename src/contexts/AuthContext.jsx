import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            setUser(session?.user ?? null);
        } catch (error) {
            console.error('Error checking session:', error);
        } finally {
            setLoading(false);
        }
    }

    checkSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback` // Ensure this matches Supabase settings
        }
      })
      if (error) throw error
    } catch (error) {
       console.error("Error signing in with Google:", error.message)
       // You might want to expose this error to the UI
       throw error;
    }
  }

  const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        console.error("Error signing out:", error.message)
    }
  }

  const value = {
    user,
    signInWithGoogle,
    signOut,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
