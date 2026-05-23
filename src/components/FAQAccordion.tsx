"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus } from "react-icons/fi";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

type FAQCategory = {
  categoryName: string;
  questions: FAQ[];
};

export default function FAQAccordion({ groupedFaqs }: { groupedFaqs: FAQCategory[] }) {
  // 1. State for the Outer Accordion (Categories)
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  
  // 2. State for the Inner Accordion (Questions)
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  // Toggle handlers
  const toggleCategory = (categoryName: string) => {
    if (openCategory === categoryName) {
      setOpenCategory(null);
      setOpenQuestionId(null); // Reset the opened question when closing the category
    } else {
      setOpenCategory(categoryName);
      setOpenQuestionId(null); // Reset questions when opening a new category
    }
  };

  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {groupedFaqs.map((group) => {
        const isCategoryOpen = openCategory === group.categoryName;

        return (
          <div key={group.categoryName} className="border border-[#251605]/20 rounded-sm bg-white/40 transition-all">
            {/* The Outer Category Button */}
            <button
              onClick={() => toggleCategory(group.categoryName)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-[#251605]/5 transition-colors"
            >
              <h2 className="text-2xl font-zen text-[#251605] tracking-tight">
                {group.categoryName}
              </h2>
              {isCategoryOpen ? <FiChevronUp size={28} /> : <FiChevronDown size={28} />}
            </button>

            {/* The Expanded Category Content */}
            {isCategoryOpen && (
              <div className="px-6 pb-6 pt-0 mt-2 border-t border-[#251605]/10">
                {group.questions.length > 0 ? (
                  <div className="pt-2">
                    {group.questions.map((faq) => {
                      const isQuestionOpen = openQuestionId === faq.id;

                      return (
                        <div key={faq.id} className="border-b border-[#251605]/10 last:border-0">
                          {/* The Inner Question Button */}
                          <button
                            onClick={() => toggleQuestion(faq.id)}
                            className="w-full flex justify-between items-start py-5 text-left hover:text-[#251605]/70 transition-colors"
                          >
                            <p className="text-xl md:text-3xl font-goudy pr-8">
                              {faq.question}
                            </p>
                            <span className="mt-1 flex-shrink-0 text-[#251605]/60">
                              {isQuestionOpen ? <FiMinus size={24} /> : <FiPlus size={24} />}
                            </span>
                          </button>
                          
                          {/* The Expanded Answer Content */}
                          {isQuestionOpen && (
                            <div
                              className="prose prose-lg max-w-none font-goudy text-[#251605]/90 pb-6 pl-4 border-l-2 border-[#251605]/10 animate-in fade-in slide-in-from-top-2 duration-300"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-goudy text-lg italic text-[#251605]/70 pt-6">
                    There are no questions in this category at this time. Check back soon.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}