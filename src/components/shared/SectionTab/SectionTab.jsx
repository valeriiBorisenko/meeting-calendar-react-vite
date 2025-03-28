import './section-tab.css';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const SectionTab = ({ children, className }) => {

    return (
        <motion.section
            key="schedule"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            variants={{
                initial: { opacity: 0, x: 10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -10 },
            }}
            className={`p-3 gap-4 shadow-sm rounded overflow-hidden d-flex flex-column bg-white w-100 ${className}`}
        >
            { children }
        </motion.section>
    );
};

export default SectionTab;