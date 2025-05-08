import { type ColorOption, intensities } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ColorPickerProps {
  label: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
  colors: readonly ColorOption[];
}

export function ColorPicker({
  label,
  selectedColor,
  onColorChange,
  colors,
}: ColorPickerProps) {
  const [currentColor, currentIntensity] = selectedColor.split('-');

  const handleColorChange = (color: string) => {
    onColorChange(`${color}-${currentIntensity}`);
  };

  const handleIntensityChange = (intensity: string) => {
    onColorChange(`${currentColor}-${intensity}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{label}</label>
        <Select value={currentIntensity} onValueChange={handleIntensityChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {intensities.map((intensity) => (
              <SelectItem key={intensity} value={intensity}>
                {intensity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {colors.map((color) => {
          const colorClass = `bg-${color}-${currentIntensity}`;
          const isSelected = currentColor === color;
          
          return (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-full aspect-square rounded-lg ${colorClass} transition-all
                ${isSelected ? 'ring-2 ring-offset-2 ring-offset-background' : 'hover:scale-105'}
              `}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
}