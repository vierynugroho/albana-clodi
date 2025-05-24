import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface PageTitleProps {
    title: string;
    showBackButton?: boolean;
}

const PageTitle: FC<PageTitleProps> = ({ title, showBackButton = true }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6 space-y-5">
            <div className="flex items-center gap-2">

                {showBackButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        aria-label="Go back"
                    >
                        <IoIosArrowBack className="w-5 h-5" />
                    </button>
                )}
                <h2
                    className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white/90"
                    x-text="pageName"
                >
                    {title}
                </h2>
            </div>
            <hr />
        </div>
    );
};

export default PageTitle;
