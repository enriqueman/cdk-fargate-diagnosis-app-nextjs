"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiagnosisForm from "@/components/DiagnosisForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import PatientHistoryTable from "@/components/PatientHistoryTable";
import { toast } from "sonner";
import { diagnosisService } from "@/services/api";

const HomePage = () => {
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDiagnosisSubmit = async (symptoms) => {
    try {
      setLoading(true);
      
      // Usamos el servicio de API para obtener el diagnóstico
      const result = await diagnosisService.requestDiagnosis(symptoms);
      
      const newDiagnosis = {
        id: Date.now().toString(),
        patientId: symptoms.patientId,
        symptoms: symptoms,
        diagnosis: result.diagnosis,
        date: new Date().toISOString(),
      };
      
      setDiagnosisResult(result.diagnosis);
      setPatientHistory((prev) => [newDiagnosis, ...prev]);
      toast.success("Diagnóstico completado con éxito");
    } catch (error) {
      console.error("Error al realizar diagnóstico:", error);
      toast.error("Error al procesar el diagnóstico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-800">
          Sistema de Diagnóstico Médico
        </h1>
        <p className="text-gray-600 mt-2">
          Herramienta para diagnóstico basado en síntomas
        </p>
      </header>

      <Tabs defaultValue="diagnosis" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="diagnosis">Nuevo Diagnóstico</TabsTrigger>
          {/* <TabsTrigger value="history">Historial de Pacientes</TabsTrigger> */}
        </TabsList>
        
        <TabsContent value="diagnosis" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-cyan-700">
                Síntomas del Paciente
              </h2>
              <DiagnosisForm 
                onSubmit={handleDiagnosisSubmit} 
                isLoading={loading} 
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-cyan-700">
                Resultado del Diagnóstico
              </h2>
              <ResultsDisplay 
                result={diagnosisResult} 
                isLoading={loading} 
              />
            </Card>
          </div>
        </TabsContent>
        
        {/* <TabsContent value="history" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-700">
              Historial de Diagnósticos
            </h2>
            <PatientHistoryTable history={patientHistory} />
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default HomePage;