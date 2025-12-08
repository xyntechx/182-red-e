import { cn } from "@sglara/cn";
import { participation_colors } from "@/utils/colors";
import { IPost } from "@/utils/types";

const Post = ({
    thread_id,
    title,
    subgroup,
    author_name,
    participation_type,
    content,
    created_at,
    updated_at,
}: IPost) => {
    return (
        <div className="border p-2 rounded w-full shadow-md hover:shadow-2xl transition-shadow hover:cursor-pointer">
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex flex-row items-start justify-start gap-4">
                <p className="text-gray-500">{author_name}</p>
                <p
                    className={cn(
                        participation_colors[participation_type],
                        "w-fit",
                        "px-1",
                        "rounded"
                    )}
                >
                    Participation Special {participation_type}
                </p>
                <p
                    className={cn(
                        "bg-black",
                        "text-white",
                        "w-fit",
                        "px-1",
                        "rounded"
                    )}
                >
                    {subgroup
                        .split(" ")
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                </p>
            </div>
            <p>{content}</p>
        </div>
    );
};

export default Post;
