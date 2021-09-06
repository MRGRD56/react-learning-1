import React, {useState} from 'react';

function Counter(props: {}) {
    const [count, setCount] = useState(0);

    function incrementCounter(increment: number) {
        setCount(prevState => prevState + increment);
    }

    return (
        <div className="p-1 d-flex align-items-center">
            <div className="ps-1 pe-2">{count}</div>
            <div className="btn-group">
                <button className="btn btn-outline-primary" onClick={() => incrementCounter(1)}>+1</button>
                <button className="btn btn-outline-primary" onClick={() => incrementCounter(-1)}>-1</button>
            </div>
        </div>
    );
}

export default Counter;