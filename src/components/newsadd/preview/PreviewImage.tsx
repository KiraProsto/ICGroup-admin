export default function PreviewImage({
  imageUrl,
  imageAlt,
}: {
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <div className="preview-image__wrapper">
      <img
        src={imageUrl}
        alt={imageAlt || 'preview'}
        className="preview-image"
      />

      <div className="preview-image__overlay">
        <span className="preview-image__alt">{imageAlt}</span>
      </div>
    </div>
  );
}
