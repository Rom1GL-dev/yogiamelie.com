import React from 'react';
import Image from "next/image";

interface Props {
    title: string;
}

export default function Title({title}: Props) {
    return (
        <div className={"flex flex-col items-center mb-14"} data-aos="fade-up" data-aos-delay="100">
            <h1 className={"text-4xl font-semibold text-[#58684E] text-center mb-2"}>{title}</h1>
            <Image src={"/flower.svg"} title={"flower"} alt={"flower"} width={200} height={0}/>
        </div>
    );
}