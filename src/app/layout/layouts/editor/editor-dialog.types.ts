export interface Note
{
    id?: string;
    title?: string;
    content?: string;
    tasks?: Task[];
    image?: string | null;
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
}
