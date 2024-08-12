"use client";

import {useEffect, useRef, useState} from "react";
import styles from './numberPicker.module.css';

type Props = {
    values: string[],
    setValue: (value: string) => void
    initialValue: string
}

export default function NumberPicker({values, setValue,initialValue}: Props) {
    const numberWrapperRef = useRef<HTMLDivElement | null>(null);
    const initialIndex = values.indexOf(initialValue);
    const [currentIndex, setCurrentIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);



    useEffect(() => {
        updateNumbers(currentIndex);
        setValue(values[currentIndex]);
    }, [currentIndex]);

    useEffect(() => {
        const numberWrapper = numberWrapperRef.current;
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault(); // 기본 스크롤 동작 방지
            if (event.deltaY < 0) {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + values.length) % values.length);
            } else {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
            }
        };

        numberWrapper?.addEventListener('wheel', handleWheel, {passive: false});

        return () => {
            numberWrapper?.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const updateNumbers = (index: number) => {
        if (numberWrapperRef.current) {
            const numberElements = numberWrapperRef.current.children;
            numberElements[0].textContent = values[(index - 1 + values.length) % values.length];
            numberElements[1].textContent = values[index];
            numberElements[2].textContent = values[(index + 1) % values.length];
        }
    };

    const setTransform = (y: number) => {
        if (numberWrapperRef.current) {
            numberWrapperRef.current.style.transform = `translateY(${y}px)`;
        }
    };

    const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();
        setIsDragging(true);
        setStartY(event.type === 'touchstart' ? (event as React.TouchEvent).touches[0].clientY : (event as React.MouseEvent).clientY);
        setCurrentY(0);
    };

    const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const y = event.type === 'touchmove' ? (event as React.TouchEvent).touches[0].clientY : (event as React.MouseEvent).clientY;
        const newCurrentY = y - startY;
        setCurrentY(newCurrentY);
        setTransform(newCurrentY);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 25; // px
        if (currentY < -threshold) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
        } else if (currentY > threshold) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + values.length) % values.length);
        }

        setTransform(0); // Snap back to the center
    };

    return (
        <div className={styles.numberPicker}>
            <div
                className={styles.numberWrapper}
                ref={numberWrapperRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <div className={styles.number}>55</div>
                <div className={`${styles.number} ${styles.selected}`}>00</div>
                <div className={styles.number}>05</div>
            </div>
        </div>
    );
};