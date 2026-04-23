import type { QuizQuestion } from '../data/quizData'

type QuizCardProps = {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: string | null
  hasAnswered: boolean
  onSelect: (option: string) => void
}

const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  hasAnswered,
  onSelect,
}: QuizCardProps) => {
  const getOptionClasses = (option: string) => {
    const isSelected = selectedOption === option
    const isCorrect = option === question.answer
    const selectedIsWrong = hasAnswered && isSelected && !isCorrect

    if (!hasAnswered) {
      return 'border-white/30 bg-white/5 hover:bg-white/10 text-slate-100'
    }

    if (isCorrect) {
      return 'border-green-400/80 text-green-300 bg-green-400/10'
    }

    if (selectedIsWrong) {
      return 'border-red-400/80 text-red-300 bg-red-400/10 animate-shake'
    }

    return 'border-white/20 bg-white/5 text-slate-400'
  }

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-glass backdrop-blur-xl md:p-8">
      <div className="mb-5 flex items-center justify-between text-sm text-slate-300">
        <span>
          Câu {questionNumber}/{totalQuestions}
        </span>
        <span>MLN122 • Chương 6</span>
      </div>

      <h2 className="mb-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">{question.question}</h2>

      <div className="grid gap-3">
        {question.options.map((option) => {
          const isCorrect = option === question.answer
          const isSelected = selectedOption === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              disabled={hasAnswered}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left font-medium transition ${getOptionClasses(option)} ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span>{option}</span>
              {hasAnswered && isCorrect && <span aria-hidden="true">✅</span>}
              {hasAnswered && isSelected && !isCorrect && <span aria-hidden="true">❌</span>}
            </button>
          )
        })}
      </div>

      {hasAnswered && (
        <div className="mt-6 rounded-xl border border-cyan-300/40 bg-cyan-400/10 p-4 text-sm text-cyan-100">
          <span className="font-semibold">💡 Logic:</span> {question.reference}
        </div>
      )}
    </div>
  )
}

export default QuizCard
