import React, { useState, useEffect } from 'react';

const Timer = ({ onFinish }) => {
    const [countdown, setCountdown] = useState(25 * 60); // 25 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            onFinish();
        }
    }, [countdown, onFinish]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <p>Within {formatTime(countdown)}</p>
        </div>
    );
};

export default Timer;
