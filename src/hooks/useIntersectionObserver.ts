import {RefObject, useEffect, useRef} from "react";

export default function useIntersectionObserver(elementRef: RefObject<Element>,
                                                callback: (entry: IntersectionObserverEntry[]) => void) {
    const observer = useRef<IntersectionObserver>();
    useEffect(() => {
        const element = elementRef.current!;
        observer.current = new IntersectionObserver(entry => {
            if (!entry[0].isIntersecting) return;
            callback(entry);
        });
        observer.current?.observe(element);

        return () => {
            observer.current?.unobserve(element);
        };
    }, [callback, elementRef]);
}
