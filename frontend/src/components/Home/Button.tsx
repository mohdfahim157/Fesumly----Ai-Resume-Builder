import { Link } from "react-router-dom";

export default function Button() {
  return (
      <>
            <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 100% 50%;
                    filter: blur(6px);
                    background-image: linear-gradient(45deg, red , green, orange, green);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
            <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-1 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                <Link to={"/login"} className= " cursor-pointer px-8 text-sm py-3 text-white rounded-full font-medium bg-green-700 backdrop-blur">
                    Get Started Now
                </Link>
            </div>
        </>
  )
}
