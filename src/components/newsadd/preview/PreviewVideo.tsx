export default function PreviewVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <video
      className="preview-video"
      controls
      src={videoUrl}
      aria-label="Видео в публикации"
    ></video>
  );
}
