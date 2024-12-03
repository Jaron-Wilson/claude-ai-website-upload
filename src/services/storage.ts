import { LinkItem, LinkStore } from '../types';

const STORAGE_KEY = 'link-showcase-data';

export const storage = {
    getData: (): LinkStore => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            return { items: [] };
        }
        return JSON.parse(data);
    },

    saveData: (data: LinkStore) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    addItem: (item: Omit<LinkItem, 'id' | 'createdAt'>) => {
        const data = storage.getData();
        const newItem: LinkItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: Date.now(),
        };
        data.items.push(newItem);
        storage.saveData(data);
        return newItem;
    },

    deleteItem: (id: string) => {
        const data = storage.getData();
        data.items = data.items.filter(item => item.id !== id);
        storage.saveData(data);
    },

    updateItem: (id: string, updates: Partial<LinkItem>) => {
        const data = storage.getData();
        data.items = data.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
        );
        storage.saveData(data);
    }
};