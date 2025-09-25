
import './App.css'
import cardImg from "./assets/vector1.png"
import cardImg2 from "./assets/vector2.png"

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
     <div className="w-full px-6 md:px-12 py-10 bg-gray-50">
    <div className="flex flex-col sm:flex-row gap-6 w-full">
      {/* In-Progress Card */}
      <div className="flex-1 h-60 rounded-xl bg-gradient-to-r from-purple-700 to-purple-400 text-white p-8 shadow-md flex flex-col justify-center items-center">
        <p className="text-lg font-medium">In-Progress</p>
        <p className="text-4xl font-bold mt-2">0</p>
      </div>

      {/* Resolved Card */}
      <div className="flex-1 rounded-xl bg-gradient-to-r from-green-300 to-green-600 text-white p-8 shadow-md flex flex-col justify-center items-center">
        <p className="text-lg font-medium">Resolved</p>
        <p className="text-4xl font-bold mt-2">0</p>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default App
