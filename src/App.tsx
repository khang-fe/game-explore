import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { GameDetail } from './pages/GameDetail'
import { RoundDetail } from './pages/RoundDetail'
import { TablesPage } from './pages/TablesPage'
import { RoundsPage } from './pages/RoundsPage'
import { Header } from './components/Header'
import i18n from './i18n'

function App() {
  console.log('App rendered', i18n.language)
  return (
    <Router>
      <div className="App w-[100vw]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/round/:id" element={<RoundDetail />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/rounds" element={<RoundsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
