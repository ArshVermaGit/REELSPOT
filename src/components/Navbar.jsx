import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, Film } from 'lucide-react'

const Navbar = () => {
  const { user, signOut } = useAuth()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">Reelspot</span>
        </Link>
        <div className="flex items-center gap-4">
            {user ? (
                 <>
                  <Link to="/history" className="text-sm font-medium transition-colors hover:text-primary">
                    History
                  </Link>
                  <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                    Dashboard
                  </Link>
                  <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
            ) : (
                <div className="text-sm text-muted-foreground">Guest</div>
            )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
