import React, { FC, useState } from 'react';
import { CheckBoxProps } from '../';
import { mergeClasses } from '../../../shared/utilities';

import styles from './checkbox.module.scss';

export const CheckBox: FC<CheckBoxProps> = ({
    ariaLabel,
    checked = false,
    defaultChecked,
    disabled = false,
    name,
    value = '',
    id = `checkbox-${value}-${Math.random().toString(36).slice(2)}`,
    onChange,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const checkBoxCheckClassNames: string = mergeClasses([
        styles.checkmark,
        { [styles.disabled]: disabled },
    ]);

    const toggleChecked = (): void => {
        if (!disabled) setIsChecked(!isChecked);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Tab') event.preventDefault();
        if (event.key === 'Enter' || event.key === ' ') toggleChecked();
    };

    return (
        <div className={styles.selector} onKeyDown={handleKeyDown}>
            <input
                aria-label={ariaLabel}
                checked={isChecked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                onChange={onChange ? onChange : toggleChecked}
                name={name}
                tabIndex={-1}
                type={'checkbox'}
                value={value}
                readOnly
            />
            <label
                htmlFor={id}
                className={value === '' ? styles.labelNoValue : ''}
            >
                <span className={checkBoxCheckClassNames} tabIndex={0}></span>
                <span className={styles.selectorLabel}>{value}</span>
            </label>
        </div>
    );
};
