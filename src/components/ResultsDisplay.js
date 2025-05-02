
import React from "react";
import { Card } from "@/components/ui/card";

const ResultsDisplay = ({ result, isLoading }) => {
  const getBadgeClass = (diagnosis) => {
    if (!diagnosis) return "bg-gray-200 text-gray-700";
    
    switch (diagnosis) {
      case "NO ENFERMO":
        return "bg-green-100 text-green-800 border-green-300";
      case "ENFERMEDAD LEVE":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "ENFERMEDAD AGUDA":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "ENFERMEDAD CRÓNICA":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getRecommendation = (diagnosis) => {
    if (!diagnosis) return "";
    
    switch (diagnosis) {
      case "NO ENFERMO":
        return "No se requiere tratamiento médico específico. Se recomienda seguir hábitos saludables.";
      case "ENFERMEDAD LEVE":
        return "Se recomienda tratamiento sintomático y seguimiento periódico.";
      case "ENFERMEDAD AGUDA":
        return "Requiere atención médica inmediata y posible tratamiento intensivo.";
      case "ENFERMEDAD CRÓNICA":
        return "Necesita un plan de tratamiento a largo plazo y monitoreo constante.";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700"></div>
        <p className="mt-4 text-gray-600">Analizando síntomas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!result ? (
        <div className="text-center p-8">
          <p className="text-gray-500">
            Complete el formulario para generar un diagnóstico
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <span 
              className={`inline-block px-4 py-2 rounded-full text-lg font-medium border ${getBadgeClass(result)}`}
            >
              {result}
            </span>
          </div>
          
          <Card className="p-4 bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-2">Recomendación</h3>
            <p className="text-gray-600">{getRecommendation(result)}</p>
          </Card>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Acciones recomendadas</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {result === "NO ENFERMO" && (
                <>
                  <li>Mantener hábitos saludables</li>
                  <li>Chequeo rutinario en 12 meses</li>
                </>
              )}
              {result === "ENFERMEDAD LEVE" && (
                <>
                  <li>Seguimiento en 2 semanas</li>
                  <li>Considerar análisis complementarios</li>
                  <li>Tratamiento sintomático</li>
                </>
              )}
              {result === "ENFERMEDAD AGUDA" && (
                <>
                  <li>Evaluación especializada inmediata</li>
                  <li>Considerar hospitalización</li>
                  <li>Pruebas diagnósticas adicionales</li>
                </>
              )}
              {result === "ENFERMEDAD CRÓNICA" && (
                <>
                  <li>Derivación a especialista</li>
                  <li>Plan de tratamiento a largo plazo</li>
                  <li>Monitoreo continuo</li>
                  <li>Evaluación de comorbilidades</li>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;
