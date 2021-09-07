import React, {useState} from 'react';

interface DivProps extends React.HTMLProps<HTMLDivElement> {
    onValueChange?: (newValue: number) => void
}

function Counter(props: DivProps, ref: React.ForwardedRef<HTMLDivElement>) {
    const [count, setCount] = useState(0);

    function incrementCounter(increment: number) {
        const newValue = count + increment;
        setCount(newValue);
        props.onValueChange?.(newValue);
    }

    return (
        <div className="p-1 d-flex align-items-center" ref={ref}>
            <div className="ps-1 pe-2">{count}</div>
            <div className="btn-group">
                <button className="btn btn-outline-primary" onClick={() => incrementCounter(1)}>+1</button>
                <button className="btn btn-outline-primary" onClick={() => incrementCounter(-1)}>-1</button>
            </div>
        </div>
    );
}

export default React.forwardRef<HTMLDivElement, DivProps>(Counter);