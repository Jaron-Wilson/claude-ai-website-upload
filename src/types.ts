export interface LinkItem {
    id: string;
    title: string;
    videoUrl?: string;
    amazonUrl?: string;
    createdAt: number;
}

export interface LinkStore {
    items: LinkItem[];
}