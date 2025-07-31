import React from 'react';

const ReviewSection = ({data=[], title = ""}) => {
    return (
        <>
            <div className={"reviewSection lg:py-3 py-2 lg:mt-20 md:mt-16 mt-8"}>
                <h2 className={"lg:text-2xl md:text-xl text-lg text-white font-medium text-center"}>
                    {title}
                </h2>
            </div>

        </>
    );
};

export default ReviewSection;