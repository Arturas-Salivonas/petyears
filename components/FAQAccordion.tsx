import Accordion from './Accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const accordionItems = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: <p>{item.answer}</p>
  }));

  return (
    <Accordion
      items={accordionItems}
      type="multiple"
    />
  );
};

export default FAQAccordion;