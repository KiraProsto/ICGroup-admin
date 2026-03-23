import './preview.css';

export default function PreviewPublication({
  publication,
}: {
  publication: { title: string; url: string } | null;
}) {
  if (!publication) return null;

  return (
    <a
      href={publication.url}
      className="preview-publication"
      aria-label={`Открыть публикацию: ${publication.title}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {publication.title}
    </a>
  );
}
