
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { User, Weight, Ruler } from "lucide-react";

const PatientHistoryTable = ({ history }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDiagnosisBadge = (diagnosis) => {
    let badgeClass = "";
    
    switch (diagnosis) {
      case "NO ENFERMO":
        badgeClass = "bg-green-100 text-green-800";
        break;
      case "ENFERMEDAD LEVE":
        badgeClass = "bg-yellow-100 text-yellow-800";
        break;
      case "ENFERMEDAD AGUDA":
        badgeClass = "bg-orange-100 text-orange-800";
        break;
      case "ENFERMEDAD CRÓNICA":
        badgeClass = "bg-red-100 text-red-800";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {diagnosis}
      </span>
    );
  };

  const getMainSymptoms = (symptoms) => {
    const mainSymptoms = [];
    
    if (symptoms.primarySymptom) mainSymptoms.push(symptoms.primarySymptom);
    if (symptoms.secondarySymptom) mainSymptoms.push(symptoms.secondarySymptom);
    if (symptoms.tertiarySymptom) mainSymptoms.push(symptoms.tertiarySymptom);
    
    // Add checked symptoms
    if (symptoms.fever) mainSymptoms.push("Fiebre");
    if (symptoms.headache) mainSymptoms.push("Dolor de cabeza");
    if (symptoms.abdominalPain) mainSymptoms.push("Dolor abdominal");
    
    // Limit to 3 symptoms for display
    return mainSymptoms.slice(0, 3).join(", ") + (mainSymptoms.length > 3 ? "..." : "");
  };

  const getPatientDetails = (symptoms) => {
    const details = [];
    
    if (symptoms.age) details.push(`${symptoms.age} años`);
    if (symptoms.sex) {
      const sex = symptoms.sex === 'M' ? 'Masculino' : (symptoms.sex === 'F' ? 'Femenino' : 'Otro');
      details.push(sex);
    }
    
    return details.join(", ");
  };

  return (
    <div>
      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay diagnósticos registrados
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Paciente</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Detalles</TableHead>
                <TableHead>Síntomas principales</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.patientId}</TableCell>
                  <TableCell>{record.symptoms.patientName}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {getPatientDetails(record.symptoms)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {getMainSymptoms(record.symptoms)}
                  </TableCell>
                  <TableCell>{getDiagnosisBadge(record.diagnosis)}</TableCell>
                  <TableCell>{formatDate(record.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PatientHistoryTable;
