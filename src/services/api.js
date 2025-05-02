
// Este servicio maneja las peticiones a la API de diagnóstico médico

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1';

/**
 * Servicio para realizar diagnósticos con base en los síntomas del paciente
 */
export const diagnosisService = {
  /**
   * Realiza una solicitud de diagnóstico a la API
   * @param {Object} symptomsData - Datos de los síntomas del paciente
   * @returns {Promise<Object>} - Resultado del diagnóstico
   */
  requestDiagnosis: async (symptomsData) => {
    try {
      // En un entorno real, conectaría con la API real
      // Para desarrollo/demo, puede usar la API local o simular
      const useLocalAPI = true; // Cambiar a true para usar la API FastAPI local

      if (useLocalAPI) {
        const response = await fetch(`${API_BASE_URL}/api/simplified-diagnosis`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(symptomsData)
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        return await response.json();
      } else {
        // Simular API para desarrollo/demo
        return new Promise((resolve) => {
          setTimeout(() => {
            // Calculate severity based on primary symptoms
            const primarySeverity = 
              parseInt(symptomsData.severityLevel1) + 
              parseInt(symptomsData.severityLevel2) + 
              parseInt(symptomsData.severityLevel3);
            
            // Calculate risk factors
            let riskFactors = 0;
            if (symptomsData.smoking) riskFactors += 1;
            if (symptomsData.alcohol) riskFactors += 1;
            if (symptomsData.drugs) riskFactors += 1;
            
            // Calculate symptom count
            let symptomCount = 0;
            
            // Count checked symptoms
            if (symptomsData.fever) symptomCount++;
            if (symptomsData.rash) symptomCount++;
            if (symptomsData.cough) symptomCount++;
            if (symptomsData.skinEruptions) symptomCount++;
            if (symptomsData.nightSweats) symptomCount++;
            if (symptomsData.bloodInUrine) symptomCount++;
            if (symptomsData.bloodInStool) symptomCount++;
            if (symptomsData.constipation) symptomCount++;
            if (symptomsData.nausea) symptomCount++;
            if (symptomsData.headache) symptomCount++;
            if (symptomsData.abdominalPain) symptomCount++;
            if (symptomsData.insomnia) symptomCount++;
            if (symptomsData.fatigue) symptomCount++;
            if (symptomsData.diarrhea) symptomCount++;
            
            // Add primary symptoms (if filled)
            if (symptomsData.primarySymptom.trim()) symptomCount++;
            if (symptomsData.secondarySymptom.trim()) symptomCount++;
            if (symptomsData.tertiarySymptom.trim()) symptomCount++;
            
            // Calculate total risk score (primary severity + risk factors + symptom count)
            const totalRiskScore = primarySeverity + riskFactors + Math.min(10, symptomCount);
            
            // Determine diagnosis based on total risk score
            let diagnosis;
            if (totalRiskScore <= 6) {
              diagnosis = "NO ENFERMO";
            } else if (totalRiskScore <= 12) {
              diagnosis = "ENFERMEDAD LEVE";
            } else if (totalRiskScore <= 18) {
              diagnosis = "ENFERMEDAD AGUDA";
            } else {
              diagnosis = "ENFERMEDAD CRÓNICA";
            }
            
            // Check for critical symptoms that could immediately elevate the diagnosis
            if ((symptomsData.bloodInUrine || symptomsData.bloodInStool) && symptomsData.fever) {
              // Presence of blood and fever is always concerning
              if (diagnosis === "NO ENFERMO") {
                diagnosis = "ENFERMEDAD LEVE";
              } else if (diagnosis === "ENFERMEDAD LEVE") {
                diagnosis = "ENFERMEDAD AGUDA";
              }
            }
            
            resolve({
              diagnosis,
              riskScore: totalRiskScore,
              patientId: symptomsData.patientId,
              patientName: symptomsData.patientName
            });
          }, 1500);
        });
      }
    } catch (error) {
      console.error('Error en solicitud de diagnóstico:', error);
      throw error;
    }
  },
  
  /**
   * Obtiene el historial de diagnósticos de un paciente
   * @param {string} patientId - ID del paciente
   * @returns {Promise<Array>} - Historial de diagnósticos
   */
  getPatientHistory: async (patientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}/history`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener historial:', error);
      throw error;
    }
  },
  
  /**
   * Guarda un nuevo diagnóstico en el historial del paciente
   * @param {Object} diagnosisData - Datos del diagnóstico
   * @returns {Promise<Object>} - Diagnóstico guardado
   */
  saveDiagnosis: async (diagnosisData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/diagnosis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diagnosisData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al guardar diagnóstico:', error);
      throw error;
    }
  }
};

export default diagnosisService;
