'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaRedo, FaTrophy, FaBrain, FaLightbulb } from 'react-icons/fa'

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  category: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What percentage of global e-waste is properly recycled?',
    options: ['5%', '17.4%', '35%', '50%'],
    correctAnswer: '17.4%',
    explanation: 'Only 17.4% of e-waste is properly recycled globally, highlighting the urgent need for better recycling practices.',
    category: 'Statistics'
  },
  {
    id: 2,
    question: 'Which of these contains toxic materials?',
    options: ['LCD screens', 'Batteries', 'Circuit boards', 'All of the above'],
    correctAnswer: 'All of the above',
    explanation: 'All these components contain various toxic materials that can harm the environment if not properly disposed of.',
    category: 'Toxic Materials'
  },
  {
    id: 3,
    question: 'How much e-waste is generated annually worldwide?',
    options: ['25M tons', '35M tons', '50M tons', '65M tons'],
    correctAnswer: '50M tons',
    explanation: 'Approximately 50 million tons of e-waste is generated globally each year, making it one of our fastest-growing waste streams.',
    category: 'Global Impact'
  },
  {
    id: 4,
    question: 'What percentage of a smartphone can be recycled?',
    options: ['40%', '60%', '80%', 'Up to 95%'],
    correctAnswer: 'Up to 95%',
    explanation: "Up to 95% of a smartphone's components can be recycled and reused, including precious metals, plastics, and glass.",
    category: 'Recycling'
  },
  {
    id: 5,
    question: 'Which metal is most commonly found in e-waste?',
    options: ['Gold', 'Silver', 'Copper', 'Aluminum'],
    correctAnswer: 'Copper',
    explanation: 'Copper is the most abundant metal in e-waste, found in wiring, circuit boards, and other electronic components.',
    category: 'Materials'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const optionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return { message: "Perfect! You're an e-waste expert!", icon: FaTrophy, color: 'from-yellow-400 to-orange-500' }
    if (percentage >= 75) return { message: 'Great job! You know your stuff!', icon: FaBrain, color: 'from-blue-400 to-purple-500' }
    if (percentage >= 50) return { message: 'Good effort! Keep learning!', icon: FaLightbulb, color: 'from-green-400 to-blue-500' }
    return { message: 'Time to brush up on e-waste knowledge!', icon: FaLightbulb, color: 'from-orange-400 to-red-500' }
  }

  if (quizComplete) {
    const scoreInfo = getScoreMessage()
    const IconComponent = scoreInfo.icon
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl 
                       border border-purple-500/30 rounded-3xl p-12 max-w-2xl w-full
                       shadow-2xl shadow-purple-500/20"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="text-center mb-8"
            >
              <IconComponent className="text-8xl mx-auto mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Quiz Complete!
            </h2>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {score} / {questions.length}
            </motion.div>

            <p className="text-xl text-gray-300 text-center mb-8">{scoreInfo.message}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="flex items-center justify-center space-x-3 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 
                         text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-purple-500/25 
                         transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60"
            >
              <FaRedo className="text-lg" />
              <span>Try Again</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300c6ff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-slate-900/70 py-20 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              E-Waste Quiz
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Test your knowledge about electronic waste and recycling. Challenge yourself with these interactive questions!
            </p>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="py-16 bg-slate-900/50 backdrop-blur-lg border-t border-b border-slate-700">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-slate-400">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="text-sm text-slate-400">
                  Score: {score}
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block bg-slate-800/60
                           border border-slate-700 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-cyan-300 font-medium text-sm">
                {questions[currentQuestion].category}
              </span>
            </motion.div>

            {/* Question */}
            <motion.h3
              key={currentQuestion}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-8 text-slate-100 leading-relaxed"
            >
              {questions[currentQuestion].question}
            </motion.h3>

            {/* Options */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              {questions[currentQuestion].options.map((option) => (
                <motion.button
                  key={option}
                  variants={optionVariants}
                  whileHover={{ 
                    scale: selectedAnswer ? 1 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  className={`p-5 rounded-xl text-left transition-all duration-300 border-2 w-full text-lg
                    ${
                      selectedAnswer
                        ? option === questions[currentQuestion].correctAnswer
                          ? 'bg-green-500/30 border-green-500'
                          : option === selectedAnswer
                          ? 'bg-red-500/30 border-red-500'
                          : 'border-slate-700 bg-slate-800/50'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800/80'
                    } ${selectedAnswer && 'cursor-default'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{option}</span>
                    {selectedAnswer && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {option === questions[currentQuestion].correctAnswer ? (
                          <FaCheck className="text-green-400 text-xl" />
                        ) : option === selectedAnswer ? (
                          <FaTimes className="text-red-400 text-xl" />
                        ) : null}
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={`p-5 rounded-xl mb-8 border-2 text-lg
                    ${
                      selectedAnswer === questions[currentQuestion].correctAnswer
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-red-500/20 border-red-500/50'
                    }`}
                >
                  <p className="text-slate-300 leading-relaxed">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {selectedAnswer && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold 
                           py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/20
                           transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/60"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 