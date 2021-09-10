import React from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
    value: string;
    setValue: (value: string) => void
}

function BindableInput({value, setValue, ...props}: Props) {
    function onChange(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
        props.onChange?.(e);
    }

    return (
        <input value={value} onChange={onChange}/>
    );
}

export default BindableInput;