import React, { useState, useEffect } from 'react';
import { Language, MockQuestion } from '../types/upsc';
import { MOCK_PRELIMS_QUESTIONS } from '../data/upscData';
import { Emblem, TricolorBar } from './Emblem';
import { Clock, CheckCircle2, XCircle, RotateCcw, Award, BookOpen, AlertCircle } from 'lucide-react';

interface MockTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({ isOpen, onClose, lang }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<{ [qId: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQ = MOCK_PRELIMS_QUESTIONS[currentQIndex];

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  };

  const handleClearResponse = (qId: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const toggleReview = (qId: number) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    MOCK_PRELIMS_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === undefined) {
        unattempted++;
      } else if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const rawScore = correct * 2.0 - incorrect * 0.66;
    return {
      correct,
      incorrect,
      unattempted,
      rawScore: Math.max(0, parseFloat(rawScore.toFixed(2))),
    };
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const stats = calculateScore();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-4xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-3.5 sm:p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={30} />
            </div>
            <div>
              <h2 className="font-serif-heading text-sm sm:text-base font-bold">
                {lang === 'hi'
                  ? 'यूपीएससी सिविल सेवा प्रिलिम्स अभ्यास टेस्ट (GS Paper-I)'
                  : 'UPSC Civil Services Prelims Mock Test (General Studies - I)'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'ओएमआर बबल पद्धति · नकारात्मक अंकन (-0.66)' : 'OMR Bubble Simulation · Negative Marking (-0.66)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded text-amber-400 font-mono text-xs border border-slate-700">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white text-lg font-bold p-1 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        <TricolorBar className="h-1 w-full" />

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto text-stone-800 text-xs space-y-5">
          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Question & OMR Area (3 columns) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Question Info Bar */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-900 text-sm">
                      Question {currentQIndex + 1} of {MOCK_PRELIMS_QUESTIONS.length}
                    </span>
                    <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded text-[11px] font-medium">
                      {currentQ.subject}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-stone-500">
                    +2.0 Marks / -0.66 Neg.
                  </span>
                </div>

                {/* Question Statement */}
                <div className="bg-stone-50 p-4 rounded-md border border-stone-200 leading-relaxed text-xs sm:text-sm font-medium whitespace-pre-line text-stone-900">
                  {lang === 'hi' ? currentQ.questionHi : currentQ.questionEn}
                </div>

                {/* Options with Interactive OMR Bubbles */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                    {lang === 'hi' ? 'उत्तर विकल्प (ओएमआर बबल पर क्लिक करें):' : 'Select Option (Click OMR Bubble):'}
                  </span>

                  {(lang === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((optionText, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`p-3 rounded-md border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-500'
                            : 'bg-white border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {/* OMR Black Ink Bubble */}
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                              : 'bg-white border-stone-400 text-stone-700'
                          }`}
                        >
                          {letter}
                        </div>

                        <span className="text-xs sm:text-sm text-stone-800 leading-snug">
                          {optionText}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Question Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleClearResponse(currentQ.id)}
                      className="px-3 py-1.5 border border-stone-300 rounded text-stone-600 hover:bg-stone-100 text-[11px]"
                    >
                      {lang === 'hi' ? 'उत्तर हटाएं (Clear)' : 'Clear Response'}
                    </button>
                    <button
                      onClick={() => toggleReview(currentQ.id)}
                      className={`px-3 py-1.5 rounded text-[11px] font-medium border ${
                        markedForReview[currentQ.id]
                          ? 'bg-purple-100 text-purple-900 border-purple-400'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {markedForReview[currentQ.id] ? '★ Marked for Review' : '☆ Mark for Review'}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex(currentQIndex - 1)}
                      className="px-3.5 py-1.5 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 disabled:opacity-40 text-xs font-semibold"
                    >
                      ← {lang === 'hi' ? 'पिछला' : 'Previous'}
                    </button>
                    <button
                      disabled={currentQIndex === MOCK_PRELIMS_QUESTIONS.length - 1}
                      onClick={() => setCurrentQIndex(currentQIndex + 1)}
                      className="px-3.5 py-1.5 bg-[#1b2a4a] text-white rounded hover:bg-stone-800 disabled:opacity-40 text-xs font-semibold"
                    >
                      {lang === 'hi' ? 'अगला' : 'Next'} →
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Palette Sidebar (1 column) */}
              <div className="border border-stone-200 rounded-md p-4 bg-stone-50 space-y-4">
                <h3 className="font-bold text-stone-900 border-b border-stone-200 pb-2">
                  {lang === 'hi' ? 'प्रश्न पैलेट' : 'Question Palette'}
                </h3>

                <div className="grid grid-cols-5 gap-2">
                  {MOCK_PRELIMS_QUESTIONS.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isReview = markedForReview[q.id];
                    const isCurrent = idx === currentQIndex;

                    let bg = 'bg-white text-stone-700 border-stone-300';
                    if (isReview) bg = 'bg-purple-600 text-white border-purple-700';
                    else if (isAnswered) bg = 'bg-emerald-600 text-white border-emerald-700';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`h-8 rounded font-mono font-bold text-xs border flex items-center justify-center transition-all ${bg} ${
                          isCurrent ? 'ring-2 ring-amber-500 scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="space-y-1.5 text-[11px] text-stone-600 pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    <span>Answered ({Object.keys(selectedAnswers).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                    <span>Marked for Review ({Object.keys(markedForReview).filter((k) => markedForReview[+k]).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white border border-stone-400 inline-block" />
                    <span>Not Answered ({MOCK_PRELIMS_QUESTIONS.length - Object.keys(selectedAnswers).length})</span>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shadow-xs transition-colors"
                  >
                    {lang === 'hi' ? 'टेस्ट जमा करें (Submit Test)' : 'Submit Test & View Score'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Result Evaluation & Explanations Screen */
            <div className="space-y-6">
              {/* Scorecard Box */}
              <div className="bg-gradient-to-br from-[#17253d] to-[#1c335a] text-white p-5 rounded-lg border border-stone-300 text-center space-y-3">
                <div className="inline-flex p-2 bg-amber-500/20 text-amber-400 rounded-full">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-serif-heading text-lg font-bold">
                  {lang === 'hi' ? 'परीक्षण परिणाम सारांश' : 'Mock Test Performance Scorecard'}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2 text-xs">
                  <div className="bg-white/10 p-2.5 rounded">
                    <span className="text-slate-300 block text-[10px] uppercase">Attempted</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {stats.correct + stats.incorrect} / {MOCK_PRELIMS_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded">
                    <span className="text-emerald-300 block text-[10px] uppercase">Correct (+2.0)</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {stats.correct}
                    </span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded">
                    <span className="text-rose-300 block text-[10px] uppercase">Incorrect (-0.66)</span>
                    <span className="text-lg font-mono font-bold text-rose-400">
                      {stats.incorrect}
                    </span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded border border-amber-400/40">
                    <span className="text-amber-300 block text-[10px] uppercase">Net Score</span>
                    <span className="text-lg font-mono font-bold text-amber-300">
                      {stats.rawScore} / 10.0
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setMarkedForReview({});
                      setTimeLeft(1200);
                      setIsSubmitted(false);
                      setCurrentQIndex(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'पुनः प्रयास करें' : 'Retake Mock Test'}</span>
                  </button>
                </div>
              </div>

              {/* Detailed Solutions & Explanations */}
              <div className="space-y-4">
                <h3 className="font-serif-heading text-sm font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'hi' ? 'विस्तृत समाधान एवं व्याख्या' : 'Detailed Solutions & Explanations'}</span>
                </h3>

                <div className="space-y-4">
                  {MOCK_PRELIMS_QUESTIONS.map((q, idx) => {
                    const userOpt = selectedAnswers[q.id];
                    const isCorrect = userOpt === q.correctOptionIndex;
                    const isSkipped = userOpt === undefined;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-md border text-xs space-y-2.5 ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : isSkipped
                            ? 'bg-stone-50 border-stone-200'
                            : 'bg-rose-50/50 border-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">
                            Q{idx + 1}. {q.subject}
                          </span>
                          <span
                            className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : isSkipped
                                ? 'bg-stone-200 text-stone-700'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? '✓ Correct' : isSkipped ? '○ Unattempted' : '✗ Incorrect'}
                          </span>
                        </div>

                        <p className="font-medium text-stone-800 whitespace-pre-line leading-relaxed">
                          {lang === 'hi' ? q.questionHi : q.questionEn}
                        </p>

                        <div className="text-[11px] font-semibold text-stone-700">
                          Correct Answer: Option {String.fromCharCode(65 + q.correctOptionIndex)}
                          {userOpt !== undefined && userOpt !== q.correctOptionIndex && (
                            <span className="text-rose-700 ml-2">
                              (Your answer: Option {String.fromCharCode(65 + userOpt)})
                            </span>
                          )}
                        </div>

                        {/* Explanation Box */}
                        <div className="bg-white p-3 rounded border border-stone-200 text-[11px] text-stone-700 leading-relaxed">
                          <span className="font-bold text-amber-900 block mb-1">
                            {lang === 'hi' ? 'आधिकारिक व्याख्या:' : 'Official Explanation:'}
                          </span>
                          {lang === 'hi' ? q.explanationHi : q.explanationEn}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
