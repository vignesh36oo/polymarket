import Portfolio from "@/components/Portfolio";
import ProtectedRoute from "@/components/ProtectedRoute";

const PortfolioPage = () => {
    return (
        <ProtectedRoute>
            <div className="bg-white dark:bg-[#0b0c10] min-h-screen transition-colors duration-200">
                <Portfolio />
            </div>
        </ProtectedRoute>
    )
}
export default PortfolioPage;