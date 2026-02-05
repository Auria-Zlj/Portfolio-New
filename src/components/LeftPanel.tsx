import { motion } from 'framer-motion';
import './LeftPanel.css';

const LeftPanel = (_props: { onAvatarClick: () => void; isNavOpen?: boolean }) => {
  return (
    <motion.div
      className="left-panel"
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    />
  );
};

export default LeftPanel;
