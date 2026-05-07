"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Using our new react-icons!

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
  // Track which category is currently open. Null means all are closed.
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    // If clicking the already open one, close it. Otherwise, open the new one.
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="space-y-4">
      {groupedFaqs.map((group) => {
        const isOpen = openCategory === group.categoryName;

        return (
          <div key={group.categoryName} className="border border-[#251605]/20 rounded-sm bg-white/40">
            {/* The Clickable Header */}
            <button
              onClick={() => toggleCategory(group.categoryName)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-[#251605]/5 transition-colors"
            >
              <h2 className="text-2xl font-zen text-[#251605] tracking-tight">
                {group.categoryName}
              </h2>
              {isOpen ? <FiChevronUp size={28} /> : <FiChevronDown size={28} />}
            </button>

            {/* The Expandable Content */}
            {isOpen && (
              <div className="p-6 pt-0 border-t border-[#251605]/10 mt-2">
                {group.questions.length > 0 ? (
                  <div className="space-y-12 pt-6">
                    {group.questions.map((faq) => (
                      <div key={faq.id} className="group pb-8 last:pb-0 border-b border-[#251605]/10 last:border-0">
                        <h3 className="text-xl md:text-2xl font-zen text-[#251605] mb-4">
                          {faq.question}
                        </h3>
                        <div
                          className="prose prose-lg max-w-none font-goudy text-[#251605]/90 pl-4 border-l-2 border-[#251605]/10"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    ))}
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