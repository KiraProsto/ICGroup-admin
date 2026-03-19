import './preview.css';

export default function PreviewPublication({
  publication,
}: {
  publication: string;
}) {
  return <div className="preview-publication">{publication}</div>;
}
