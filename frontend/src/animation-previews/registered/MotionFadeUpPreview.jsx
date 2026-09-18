import { motion, useReducedMotion } from "motion/react";

function MotionFadeUpPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[420px] items-center justify-center bg-[#0d1117] p-8">
      <motion.article
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 40,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] p-8"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8b949e]">
          FrontForge / Motion
        </span>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#f0f6fc]">
          Native React motion.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#8b949e]">
          A registered React preview powered by Motion.
        </p>
      </motion.article>
    </div>
  );
}

export default MotionFadeUpPreview;