import './preview.css';

export default function PreviewQuote({ quote }: { quote: string }) {
  return (
    <blockquote className="preview-quote">
      <img src="/newsadd/preview/quote.svg" alt="" className="quote-img" />

      <div
        className="preview-quote__content"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
    </blockquote>
  );
}
