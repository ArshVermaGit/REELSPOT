import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Reelspot free to use?",
    answer:
      "Yes! Reelspot is completely free for personal use. We support ourselves through minimal, non-intrusive advertising.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "We currently support Instagram (Reels, Posts, Stories), YouTube (Videos, Shorts), TikTok (Videos, Stories), and Facebook (Videos, Reels). We're constantly adding more platforms.",
  },
  {
    question: "What video quality can I download?",
    answer:
      "We offer multiple quality options depending on the source. For most platforms, you can download in 1080p, 720p, 480p, and audio-only (MP3) formats.",
  },
  {
    question: "Is it legal to download videos?",
    answer:
      "Downloading content for personal, offline viewing is generally acceptable. However, redistributing or using copyrighted content without permission may violate copyright laws. Please respect content creators' rights.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required for basic downloads. However, creating a free account gives you access to download history, faster downloads, and priority support.",
  },
  {
    question: "Why isn't my download working?",
    answer:
      "Make sure you're using a valid, public URL. Private accounts or age-restricted content may not be accessible. If issues persist, try refreshing the page or using a different browser.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Reelspot
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-background"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-secondary/50"
                >
                  <span className="pr-4 text-lg font-semibold text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
