export interface IPost {
    thread_id: number;
    title: string;
    subgroup: string;
    author_name: string;
    participation_type: "A" | "B" | "C" | "D" | "E";
    content: string;
    created_at: string;
    updated_at: string;
}
