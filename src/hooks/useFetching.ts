import {useState} from "react";

export default function useFetching(callback: () => Promise<void>, initialIsLoading: boolean = false)
    : [() => Promise<void>, boolean, any] {
    const [isLoading, setIsLoading] = useState<boolean>(initialIsLoading);
    const [error, setError] = useState<any>();

    async function fetch() {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetch, isLoading, error];
}