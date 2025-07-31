import React from 'react';
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from "next/link";

const PageNaveBar = () => {
    return (
        <div className={"shadow  sticky top-0 bg-white z-50"}>
            <div className={"container mx-auto max-w-6xl px-3 flex flex-wrap items-center justify-between sticky top-0"}>
                <div className=" w-14">
                    <Image src="/logo/logo.png" alt="Logo" width={100} height={100} className={'h-full w-full object-cover'} />
                </div>

                <div className="flex gap-4 items-center">
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">
                        <Facebook size={20} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-500 transition">
                        <Twitter size={20} />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition">
                        <Instagram size={20} />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition">
                        <Linkedin size={20} />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PageNaveBar;