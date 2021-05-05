import React, { useState, useEffect } from 'react';
import './dropDown.scss';

interface DropdownProps {
    placeholder: string,
    options: Array<DropDownOptions>
    onSelect: React.SetStateAction<any>
    setError: React.SetStateAction<any>
}

export interface DropDownOptions {
    flavor: string, id: number, ice_cream_lover_id: number
}


export const Dropdown: React.FC<DropdownProps> = ({
    placeholder,
    options,
    onSelect,
    setError
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<DropDownOptions>();

    const onClickEvent = (event: any) => {
        if (!event.target.matches('.dropbtn')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onClickEvent, false);

        return () => {
            window.removeEventListener('click', onClickEvent, false);
        };
    });

    const onOptionSelect = (option: DropDownOptions) => {
        setSelectedValue(option);
        onSelect(option);
        setIsOpen(false);
        setError('')
    };

    return (
        <div
            className={`dropdown dropdown-${
                isOpen && 'open'
            }`}
        >
            <div className="dropbtn" onClick={() => {
                setIsOpen(!isOpen)}}>
                {selectedValue ? selectedValue.flavor : placeholder}
            </div>
            <div className="dropdown-content">
                {options.map((option: DropDownOptions, i: number) => (
                    <div
                        key={`dropdown-option-${i}`}
                        onClick={() => onOptionSelect(option)}
                    >
                        {option.flavor}
                    </div>
                ))}
            </div>
        </div>
    );
};