import { reformatForUrl } from "@/lib/utils.ts";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/config/routes.config.ts";
import { statusColor, StatusKey, statusText, TBlogModel } from "@/features/blogs/types/blogs.type.ts";

export const BlogCard = ({ blog }: { blog: TBlogModel }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const formattedTitle = reformatForUrl(blog.title);
        navigate(APP_ROUTES.admin.blogs.path + "/" + formattedTitle);
    };

    return (
        <div
            className="flex flex-col p-4 border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-lg cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full ${statusColor[blog.type as StatusKey] || "bg-gray-400"}`}></div>
                <div className="ml-2 text-sm text-slate-600">{statusText[blog.type as StatusKey] || "Blog"}</div>
            </div>
            <div className="text-lg font-semibold mt-2">{blog.title}</div>
            {blog.subtitle && <div className="font-medium text-slate-500">{blog.subtitle}</div>}
        </div>
    );
};
