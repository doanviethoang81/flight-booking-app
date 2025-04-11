import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200); // Chỉ hiển thị khi cuộn xuống 200px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className={`fixed bottom-5 right-5 p-2 border border-blue-500 rounded-3xl cursor-pointer hover:bg-blue-50 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleScrollTop}
        >
            <IoIosArrowUp className="text-blue-500" />
        </button>
    );
}
