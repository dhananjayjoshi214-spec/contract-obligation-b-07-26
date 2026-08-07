import ObligationTracker from './features/obligation-tracker/ObligationTracker'
import Sidebar from './features/obligation-tracker/components/Sidebar'




export default function App() {
  return (
    
    
    <div className="app-shell">
      <Sidebar activeKey="obligations" />
      <div className="main-panel">
        <ObligationTracker />
      </div>
    </div>
  
  )
  
}
