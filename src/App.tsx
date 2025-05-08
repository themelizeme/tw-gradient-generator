import { useState } from 'react';
import { Copy, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ColorPicker } from '@/components/ColorPicker';
import { GradientPreview } from '@/components/GradientPreview';
import { colorOptions, intensities, directions, type Direction } from '@/lib/constants';

type GradientType = 'background' | 'text';

function App() {
  const { toast } = useToast();
  const [gradientType, setGradientType] = useState<GradientType>('background');
  const [direction, setDirection] = useState<Direction>('to-r');
  const [fromColor, setFromColor] = useState('blue-500');
  const [toColor, setToColor] = useState('purple-500');
  const [previewText, setPreviewText] = useState('Tailwind Gradient');

  const generateRandomGradient = () => {
    const randomColor = () => {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const intensity = intensities[Math.floor(Math.random() * intensities.length)];
      return `${color}-${intensity}`;
    };
    
    setFromColor(randomColor());
    setToColor(randomColor());
  };

  const gradientClass = gradientType === 'background' 
    ? `bg-gradient-${direction} from-${fromColor} to-${toColor}`
    : `text-transparent bg-clip-text bg-gradient-${direction} from-${fromColor} to-${toColor}`;

  const codeString = gradientType === 'background'
    ? `<div class="bg-gradient-${direction} from-${fromColor} to-${toColor}">
  ${previewText}
</div>`
    : `<div class="text-transparent bg-clip-text bg-gradient-${direction} from-${fromColor} to-${toColor}">
  ${previewText}
</div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    toast({
      title: "Copied to clipboard!",
      description: "The gradient code has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Tailwind Gradient Generator
          </h1>
          <p className="text-muted-foreground">
            Create beautiful gradients using Tailwind CSS.<br />
            By <a href="https://themelize.me">Themelize.me</a>
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="preview" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <GradientPreview gradientClass={gradientClass} previewText={previewText} />
            </TabsContent>

            <TabsContent value="code">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{codeString}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => setGradientType('background')}
                className={gradientType === 'background' ? 'ring-2 ring-primary' : ''}
              >
                Background Gradient
              </Button>
              <Button
                variant="outline"
                onClick={() => setGradientType('text')}
                className={gradientType === 'text' ? 'ring-2 ring-primary' : ''}
              >
                Text Gradient
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {directions.map((dir) => (
                <Button
                  key={dir}
                  variant="outline"
                  onClick={() => setDirection(dir)}
                  className={direction === dir ? 'ring-2 ring-primary' : ''}
                >
                  {dir.replace('to-', '→')}
                </Button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ColorPicker
                label="From Color"
                selectedColor={fromColor}
                onColorChange={setFromColor}
                colors={colorOptions}
              />
              <ColorPicker
                label="To Color"
                selectedColor={toColor}
                onColorChange={setToColor}
                colors={colorOptions}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preview Text</label>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background"
                placeholder="Enter preview text"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateRandomGradient} variant="outline">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Random
            </Button>
            <Button onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </Button>
          </div>
        </Card>

        <footer className="text-center text-sm text-muted-foreground">
          <p>By <a href="https://themelize.me">Themelize.me</a></p>
          <p>View this on <a href="https://github.com/themelizeme/tw-gradient-generator">GitHub</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;