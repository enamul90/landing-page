import React from 'react';

const VideoSection = () => {
    return (
        <>
            <div className={"video-section lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8"}>
                <h2 className={"lg:text-2xl md:text-xl text-lg text-white font-medium text-center"}>
                    বিস্তারিত ভিডিওতে
                </h2>
            </div>


            <div className={" w-full bg-primary"}>
                <video
                    className="w-full h-full"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/video/video.mp4" />
                </video>
            </div>
        </>
    );
};

export default VideoSection;