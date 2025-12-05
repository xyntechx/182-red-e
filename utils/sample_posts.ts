interface Post {
    id: number;
    title: string;
    author: string;
    participation_type: "a" | "b" | "c" | "d" | "e";
    content: string;
}

export const sample_posts: Post[] = [
    {
        id: 0,
        title: "This is a title",
        author: "John Doe",
        participation_type: "a",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        id: 1,
        title: "This is a title",
        author: "John Doe",
        participation_type: "b",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        id: 2,
        title: "This is a title",
        author: "John Doe",
        participation_type: "c",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        id: 3,
        title: "This is a title",
        author: "John Doe",
        participation_type: "d",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
        id: 4,
        title: "This is a title",
        author: "John Doe",
        participation_type: "e",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
];
