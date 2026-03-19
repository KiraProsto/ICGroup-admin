import './preview.css';

export default function PreviewPublication({
  publication,
}: {
  publication: string;
}) {
  return (
    <a
      href={publication}
      className="preview-publication"
      aria-label={`Открыть публикацию: ${publication}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {publication}
    </a>
  );
}
