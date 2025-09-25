
import './App.css'

function App() {
   return (
    <>
    {/* navbar */}
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="text-2xl font-semibold text-[#120B48]">
        <span className="font-bold">CS</span> — <span className="font-semibold">Ticket System</span>
      </div>
      <div className="flex items-center space-x-8">
        <a href="#" className="text-sm hover:text-purple-600 transition">Home</a>
        <a href="#" className="text-sm hover:text-purple-600 transition">FAQ</a>
        <a href="#" className="text-sm hover:text-purple-600 transition">Changelog</a>
        <a href="#" className="text-sm hover:text-purple-600 transition">Blog</a>
        <a href="#" className="text-sm hover:text-purple-600 transition">Download</a>
        <a href="#" className="text-sm hover:text-purple-600 transition">Contact</a>
        <button className="bg-gradient-to-r from-purple-700 to-purple-500 hover:text-black text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90 transition" >
          <span className="button">＋</span> New Ticket</button>
      </div>
    </nav>
    {/* banner cards */}
    
   
    </>
  )
}

export default App
