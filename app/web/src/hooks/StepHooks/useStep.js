import { useEffect, useState } from "react";

export const useCurrentStep = (sortedLesson) => {
  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    setCurrentStep(
      sortedLesson.steps && sortedLesson.steps.length
        ?
        sortedLesson.steps[0]
        :
        null
    );
  }, [sortedLesson.steps]);

  return [currentStep, setCurrentStep];
}