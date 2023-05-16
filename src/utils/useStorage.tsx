
const useStorage = () => {

    const saveItem = (name: string, item: object) => {
        localStorage.setItem(name, JSON.stringify(item));
    }

    const getItem = (name: string) => {

        const rawItem = localStorage.getItem(name) || "";

        try {
            return JSON.parse(rawItem);
        } catch {
            return rawItem;
        }

    }

    const removetem = (name: string) => {
        localStorage.removeItem(name);
    }

    return { saveItem, getItem, removetem }
}

export default useStorage