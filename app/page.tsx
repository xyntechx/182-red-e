"use client";

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { IPost } from "@/utils/types";

export default function Home() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [participationTypeFilter, setParticipationTypeFilter] = useState<
        "A" | "B" | "C" | "D" | "E"
    >();
    const [authorFilter, setAuthorFilter] = useState<string>();
    const [titleFilter, setTitleFilter] = useState<string>();

    useEffect(() => {
        const getAllPosts = async () => {
            const url =
                "https://eecs182-website-backend.onrender.com/api/threads";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);

                setPosts(result);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        getAllPosts();
    }, []);

    return (
        <main className="flex w-screen min-h-screen items-start justify-start bg-zinc-50 font-sans p-10 flex-col gap-10">
            <div className="flex items-start justify-start gap-2 flex-col">
                <h1 className="text-xl font-bold">EECS 182 Blue Team</h1>

                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <label htmlFor="participation-type">
                            Participation Type
                        </label>
                        <select
                            name="participation-type"
                            id="participation-type"
                            className="border p-2 rounded"
                            defaultValue="default"
                        >
                            <option value="default" disabled>
                                Select Participation Type
                            </option>
                            <option value="participation-a">
                                Participation Special A
                            </option>
                            <option value="participation-b">
                                Participation Special B
                            </option>
                            <option value="participation-c">
                                Participation Special C
                            </option>
                            <option value="participation-d">
                                Participation Special D
                            </option>
                            <option value="participation-e">
                                Participation Special E
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start justify-center gap-1">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            placeholder="Search Author..."
                            className="border p-2 rounded outline-none"
                        />
                    </div>

                    <div className="flex flex-col items-start justify-center gap-1">
                        <label htmlFor="post-title">Post Title</label>
                        <input
                            id="post-title"
                            placeholder="Search Post Title..."
                            className="border p-2 rounded outline-none"
                        />
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-2 w-full gap-4">
                {posts.map((post) => (
                    <Post key={post.thread_id} {...post} />
                ))}
            </section>
        </main>
    );
}
