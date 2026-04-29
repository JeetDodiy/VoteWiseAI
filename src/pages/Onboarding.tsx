import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import styles from './Onboarding.module.css';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to VoteWise AI",
      desc: "Your personal guide to becoming an empowered voter.",
      image: "🎯"
    },
    {
      title: "Learn the Process",
      desc: "Understand exactly how to register, what to carry, and where to go.",
      image: "📚"
    },
    {
      title: "Practice Voting",
      desc: "Use our realistic EVM simulator so you feel confident on Election Day.",
      image: "🗳️"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/learn');
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className={`${styles.card} glass-panel`}
      >
        <div className={styles.iconContainer}>
          <span className={styles.emoji}>{steps[step].image}</span>
        </div>
        <h2>{steps[step].title}</h2>
        <p>{steps[step].desc}</p>

        <div className={styles.dots}>
          {steps.map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === step ? styles.active : ''}`} />
          ))}
        </div>

        <button className="btn-primary" onClick={handleNext}>
          {step === steps.length - 1 ? 'Start Learning' : 'Next'} <ChevronRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}
