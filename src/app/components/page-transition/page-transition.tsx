import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pageVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false); // Track if we are exiting

  // Custom route change handler with a delay for the exit animation
  const handleRouteChange = (url: string) => {
    setIsExiting(true); // Trigger fade-out
    setTimeout(() => {
      setIsExiting(false); // Reset the exiting state after transition
      router.push(url); // Navigate to the new page after the fade-out completes
    }, 500); // Match this with the exit transition duration
  };

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        event.preventDefault();
        handleRouteChange(link.href);
      }
    };

    window.addEventListener("click", handleLinkClick);
    return () => window.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isExiting && (
        <motion.div
          key={pathname} // ensures that the animation is triggered when pathname changes
          variants={pageVariants}
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
