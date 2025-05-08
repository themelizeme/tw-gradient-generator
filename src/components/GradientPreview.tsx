interface GradientPreviewProps {
  gradientClass: string;
  previewText: string;
}

export function GradientPreview({ gradientClass, previewText }: GradientPreviewProps) {
  return (
    <div className="h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className={`w-full h-full flex items-center justify-center text-5xl font-bold ${gradientClass}`}>
        {previewText}
      </div>
    </div>
  );
}