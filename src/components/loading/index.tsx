import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({loading}:{loading:boolean}) => {
  return (
    <>
    <AnimatePresence>
      {
        loading &&
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition = {{
            duration: 1,
            ease: "easeOut",
        }}
          className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-gray-100 dark:bg-gray-900">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div>
        </motion.div>
      }
    </AnimatePresence>
    </>
  );
}

export default Loading