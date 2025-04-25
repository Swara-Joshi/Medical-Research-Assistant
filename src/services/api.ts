
import { QueryResponse, SearchFilters } from '../types';

// Mock medical data
const mockResponses: Record<string, QueryResponse> = {
  default: {
    answer: "Based on recent medical literature, there is evidence that regular exercise can significantly reduce the risk of cardiovascular disease by improving lipid profiles, reducing blood pressure, and enhancing overall cardiac function. Multiple studies suggest that 150 minutes of moderate-intensity exercise per week is associated with a 20-30% reduction in cardiovascular events.",
    results: [
      {
        id: "1",
        text: "Regular physical activity contributes to the primary and secondary prevention of several chronic diseases and is associated with a reduced risk of premature death. There appears to be a linear relation between physical activity and health status, such that a further increase in physical activity and fitness will lead to additional improvements in health status.",
        score: 0.92,
        source: {
          title: "Evidence-based benefits of physical activity on cardiovascular health",
          authors: ["Warburton, D.E.R.", "Nicol, C.W.", "Bredin, S.S.D."],
          journal: "Canadian Medical Association Journal",
          year: 2023,
          doi: "10.1503/cmaj.1040750"
        }
      },
      {
        id: "2",
        text: "In a meta-analysis of 33 studies, individuals who performed 150 minutes of moderate-intensity exercise per week showed a 24% reduction in cardiovascular events compared to sedentary controls.",
        score: 0.89,
        source: {
          title: "Exercise as Medicine - Evidence for Prescribing Exercise as Therapy in 26 Different Chronic Diseases",
          authors: ["Pedersen, B.K.", "Saltin, B."],
          journal: "Scandinavian Journal of Medicine & Science in Sports",
          year: 2022,
          doi: "10.1111/sms.12581"
        }
      },
      {
        id: "3",
        text: "Current guidelines recommend that all adults should engage in at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week, or an equivalent combination, to reduce cardiovascular risk.",
        score: 0.85,
        source: {
          title: "Physical Activity Guidelines for Americans",
          authors: ["U.S. Department of Health and Human Services"],
          year: 2023,
          url: "https://health.gov/paguidelines"
        }
      }
    ],
    query: "How does exercise affect cardiovascular health?"
  }
};

// Simulate API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchMedicalLiterature = async (
  query: string,
  filters: SearchFilters
): Promise<QueryResponse> => {
  // Simulate API call with a delay
  await delay(2000);
  
  // In a real implementation, this would make an actual API call to your Python backend
  const response = mockResponses[query] || mockResponses.default;
  
  // Apply filters (this would be done by the backend in a real implementation)
  if (filters.startYear || filters.endYear) {
    response.results = response.results.filter(result => {
      if (filters.startYear && result.source.year < filters.startYear) return false;
      if (filters.endYear && result.source.year > filters.endYear) return false;
      return true;
    });
  }
  
  return {
    ...response,
    query
  };
};
