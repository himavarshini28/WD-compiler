import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { Code, Terminal, Share2, Play, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="text-white w-full flex flex-col items-center justify-center gap-4 px-4 py-12 bg-gray-950 overflow-hidden min-h-screen">

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 my-12 pb-12">
        {/* Hero Content */}
        <div className={`flex-1 flex flex-col gap-6 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
          <div className="flex items-center gap-2">
          
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
            WD Compiler
          </h1>
          
          <p className="text-gray-400 text-lg max-w-xl">
            Create, compile, and share HTML, CSS, and JavaScript code in real-time. 
            Perfect for prototyping, teaching, or quickly testing your web development ideas.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-2">
           <Button
  size="lg"
  className="flex items-center  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-white hover:bg-gray-800"
  onClick={() => navigate("/compiler")}
>
  <Play size={18} className="mr-2" />
  Start Coding
</Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className=" flex items-center border-gray-700 hover:bg-gray-800"
              onClick={()=>navigate('/learn')}
            >
              <Terminal size={18} className="mr-2" />
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Animated Code Cards */}
        <div className={`relative flex-1 h-[400px] transition-all duration-1000 delay-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent z-10 pointer-events-none"></div>
          
          <div className="absolute top-[10%] right-[5%] w-[280px] h-[200px] bg-gray-800 rounded-lg p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-400 ml-2">HTML</div>
            </div>
            <pre className="text-xs text-blue-400 overflow-hidden">
              <code>{`<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to WD Compiler</p>
  <button class="btn">
    Click me
  </button>
</div>`}</code>
            </pre>
          </div>
          
          <div className="absolute top-[25%] left-[5%] w-[260px] h-[180px] bg-gray-800 rounded-lg p-4 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-400 ml-2">CSS</div>
            </div>
            <pre className="text-xs text-purple-400 overflow-hidden">
              <code>{`.container {
  max-width: 600px;
  margin: 0 auto;
}
.btn {
  background: #4f46e5;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}`}</code>
            </pre>
          </div>
          
          <div className="absolute bottom-[15%] right-[15%] w-[300px] h-[180px] bg-gray-800 rounded-lg p-4 shadow-xl transform rotate-[-3deg] hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-400 ml-2">JavaScript</div>
            </div>
            <pre className="text-xs text-yellow-300 overflow-hidden">
              <code>{`document.querySelector('.btn')
  .addEventListener('click', () => {
    alert('Hello from WD Compiler!');
    // Add dynamic behavior
    document.querySelector('h1')
      .style.color = '#4f46e5';
  });`}</code>
            </pre>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className={`max-w-5xl w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
        <FeatureCard 
          icon={<Code className="w-10 h-10 text-blue-400" />}
          title="Code Editor"
          description="Advanced code editor with syntax highlighting and auto-completion for HTML, CSS, and JavaScript."
        />
        <FeatureCard 
          icon={<Play className="w-10 h-10" style={{ color: '#CFFFE2' }} />}
          title="Live Preview"
          description="See your changes in real-time with our powerful live preview rendering engine."
        />
        <FeatureCard 
          icon={<Share2 className="w-10 h-10 text-purple-400" />}
          title="Share Projects"
          description="Generate shareable links to collaborate with teammates or showcase your work."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800/50 hover:bg-gray-800/80 border border-gray-700 rounded-xl p-6 transition-all hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Home;
