"use client";

import { motion } from "framer-motion";

export function VolunteerCard() {
    return (
        <motion.div
            className="bg-[#FB385E] text-white rounded-[24px] p-6 lg:p-7 flex flex-col justify-start shadow-sm w-full h-full relative overflow-hidden group aspect-square"
        >
            <h3 className="text-3xl md:text-[34px] font-bold leading-[1.1] mb-6 tracking-tight mt-1">
                Volunteer<br />Teacher
            </h3>
            <p className="text-[15.5px] font-medium leading-[1.6] opacity-95">
                Teaching basic<br />
                programming and logical<br />
                thinking to youth from local
            </p>
        </motion.div>
    );
}
