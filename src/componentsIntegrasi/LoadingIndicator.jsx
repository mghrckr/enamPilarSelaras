import React from 'react';

const LoadingIndicator = () => {


    return (
        <>
            <div className="flex flex-col items-center justify-center mb-24">
                <div className="flex gap-2">
                    <div className="w-5 h-5 rounded-full animate-pulse" style={{ backgroundColor: '#594545' }}></div>
                    <div className="w-5 h-5 rounded-full animate-pulse" style={{ backgroundColor: '#594545' }}></div>
                    <div className="w-5 h-5 rounded-full animate-pulse" style={{ backgroundColor: '#594545' }}></div>
                </div>
            </div>
        </>
    );
};

export default LoadingIndicator;
