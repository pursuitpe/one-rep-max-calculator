import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const [isMetric, setIsMetric] = useState(false);
  const [results, setResults] = useState(null);

  const convertWeight = (value, toMetric) => {
    return toMetric ? value * 0.453592 : value / 0.453592;
  };

  const calculate1RM = () => {
    let weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);

    if (isMetric) {
      weightNum = convertWeight(weightNum, false);
    }

    if (weightNum <= 0 || repsNum <= 0) {
      alert("Please enter valid weight and reps.");
      return;
    }

    const epley = weightNum * (1 + repsNum * 0.0333);
    const brzycki = weightNum / (1.0278 - 0.0278 * repsNum);
    const lombardi = weightNum * Math.pow(repsNum, 0.10);
    const oconner = weightNum * (1 + 0.025 * repsNum);
    const wathan = (weightNum * 48.8) / (53.8 - (2.2 * repsNum));

    setResults({
      epley: isMetric ? convertWeight(epley, true) : epley,
      brzycki: isMetric ? convertWeight(brzycki, true) : brzycki,
      lombardi: isMetric ? convertWeight(lombardi, true) : lombardi,
      oconner: isMetric ? convertWeight(oconner, true) : oconner,
      wathan: isMetric ? convertWeight(wathan, true) : wathan,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">1RM Estimator</h1>
      <Card className="bg-gray-100 p-6 rounded-lg shadow">
        <CardContent className="space-y-4">
          <div className="flex justify-end items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Use Metric (kg)</label>
            <Switch checked={isMetric} onCheckedChange={setIsMetric} />
          </div>
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700">Weight Lifted ({isMetric ? "kg" : "lbs"})</label>
            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700">Reps Performed</label>
            <Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full p-2 border rounded-lg" />
          </div>
          <Button onClick={calculate1RM} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold">
            Calculate 1RM
          </Button>
        </CardContent>
      </Card>
      {results && (
        <Card className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          <CardContent className="space-y-1">
            <h2 className="text-lg font-bold text-gray-800">Estimated 1RM ({isMetric ? "kg" : "lbs"})</h2>
            <p><strong>Epley:</strong> {results.epley.toFixed(2)}</p>
            <p><strong>Brzycki:</strong> {results.brzycki.toFixed(2)}</p>
            <p><strong>Lombardi:</strong> {results.lombardi.toFixed(2)}</p>
            <p><strong>O'Conner:</strong> {results.oconner.toFixed(2)}</p>
            <p><strong>Wathan:</strong> {results.wathan.toFixed(2)}</p>
          </CardContent>
        </Card>
      )}
      {results && (
        <Card className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          <CardContent className="space-y-1">
            <h2 className="text-lg font-bold text-gray-800">Rep Max Table ({isMetric ? "kg" : "lbs"})</h2>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((rep) => {
              const estimatedMax = results.epley / (1 + rep * 0.0333);
              return (
                <p key={rep}><strong>{rep}RM:</strong> {estimatedMax.toFixed(2)}</p>
              );
            })}
          </CardContent>
        </Card>
      )}
      {results && (
        <Card className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          <CardContent className="space-y-1">
            <h2 className="text-lg font-bold text-gray-800">Formula Breakdown</h2>
            <p><strong>Epley:</strong> (Weight × Reps × 0.0333) + Weight</p>
            <p><strong>Brzycki:</strong> Weight / (1.0278 - (0.0278 × Reps))</p>
            <p><strong>Lombardi:</strong> Weight × Reps^0.10</p>
            <p><strong>O'Conner:</strong> Weight × (1 + 0.025 × Reps)</p>
            <p><strong>Wathan:</strong> (Weight × 48.8) / (53.8 - (2.2 × Reps))</p>
          </CardContent>
        </Card>
      )}
      {results && (
        <Card className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
          <CardContent className="space-y-1">
            <h2 className="text-lg font-bold text-gray-800">Formula Use Cases</h2>
            <p><strong>Epley:</strong> Best for traditional strength training (≤10 reps).</p>
            <p><strong>Brzycki:</strong> More conservative; better for high-rep estimates.</p>
            <p><strong>Lombardi:</strong> Adjusts for rep-based fatigue; great for powerlifting.</p>
            <p><strong>O'Conner:</strong> Common in general strength training & conditioning.</p>
            <p><strong>Wathan:</strong> Used in powerlifting; effective for heavier loads.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
