import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-2">My Downloads</h2>
        <p>Welcome back, {user?.email}</p>
        <div className="mt-4 p-4 border border-dashed rounded flex flex-col items-center justify-center text-muted-foreground h-32">
             <p>No downloads yet.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
