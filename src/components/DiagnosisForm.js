import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Weight, 
  Ruler, 
  Cigarette, 
  Beer, 
  Pill, 
  Thermometer,
  Stethoscope, 
  Droplets, 
  Moon, 
  HeartPulse,
  BrainCircuit,
  ScrollText
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const DiagnosisForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    // Información básica del paciente
    patientId: "",
    patientName: "",
    age: "",
    sex: "",
    weight: "",
    height: "",
    
    // Hábitos
    smoking: false,
    alcohol: false,
    drugs: false,
    
    // Síntomas principales
    primarySymptom: "",
    secondarySymptom: "",
    tertiarySymptom: "",
    severityLevel1: 1,
    severityLevel2: 1,
    severityLevel3: 1,
    
    // Síntomas adicionales
    fever: false,
    rash: false,
    cough: false,
    skinEruptions: false,
    nightSweats: false,
    bloodInUrine: false,
    bloodInStool: false,
    constipation: false,
    nausea: false,
    headache: false,
    abdominalPain: false,
    insomnia: false,
    fatigue: false,
    diarrhea: false,
    additionalSymptoms: "",
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState(0);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const countSelectedSymptoms = () => {
      let count = 0;
      
      // Count selected secondary symptoms
      if (formData.fever) count++;
      if (formData.rash) count++;
      if (formData.cough) count++;
      if (formData.skinEruptions) count++;
      if (formData.nightSweats) count++;
      if (formData.bloodInUrine) count++;
      if (formData.bloodInStool) count++;
      if (formData.constipation) count++;
      if (formData.nausea) count++;
      if (formData.headache) count++;
      if (formData.abdominalPain) count++;
      if (formData.insomnia) count++;
      if (formData.fatigue) count++;
      if (formData.diarrhea) count++;
      
      // Count primary symptoms (if they are filled)
      if (formData.primarySymptom.trim()) count++;
      if (formData.secondarySymptom.trim()) count++;
      if (formData.tertiarySymptom.trim()) count++;
      
      setSelectedSymptoms(count);
    };

    countSelectedSymptoms();
  }, [formData]);

  useEffect(() => {
    // Validate basic information is filled
    const basicInfoValid = 
      formData.patientId.trim() !== "" && 
      formData.patientName.trim() !== "" && 
      formData.age.trim() !== "" && 
      formData.sex !== "" &&
      formData.weight.trim() !== "" &&
      formData.height.trim() !== "";
    
    // Validate at least 5 symptoms are selected
    const symptomsValid = selectedSymptoms >= 5;
    
    setFormIsValid(basicInfoValid && symptomsValid);
  }, [formData, selectedSymptoms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid) {
      onSubmit(formData);
    }
  };

  return React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
    // Información básica del paciente - Sección obligatoria
    React.createElement('div', { className: "bg-cyan-50 p-4 rounded-md border border-cyan-100" },
      React.createElement('h3', { className: "font-medium text-cyan-800 flex items-center gap-2 mb-4" },
        React.createElement(User, { size: 18 }),
        "Información básica del paciente",
        React.createElement('span', { className: "text-xs text-red-500 ml-2" }, "(Obligatorio)")
      ),
      
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "patientId" }, "ID del Paciente"),
          React.createElement(Input, {
            id: "patientId",
            name: "patientId",
            value: formData.patientId,
            onChange: handleInputChange,
            required: true
          })
        ),
        
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "patientName" }, "Nombre del Paciente"),
          React.createElement(Input, {
            id: "patientName",
            name: "patientName",
            value: formData.patientName,
            onChange: handleInputChange,
            required: true
          })
        ),
        
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "age" }, "Edad"),
          React.createElement(Input, {
            id: "age",
            name: "age",
            type: "number",
            min: "0",
            max: "120",
            value: formData.age,
            onChange: handleInputChange,
            required: true
          })
        ),
        
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "sex" }, "Sexo"),
          React.createElement(Select, {
            name: "sex",
            value: formData.sex,
            onValueChange: (value) => handleSelectChange("sex", value),
            required: true
          },
            React.createElement(SelectTrigger, null,
              React.createElement(SelectValue, { placeholder: "Seleccionar sexo" })
            ),
            React.createElement(SelectContent, null,
              React.createElement(SelectItem, { value: "M" }, "Masculino"),
              React.createElement(SelectItem, { value: "F" }, "Femenino"),
              React.createElement(SelectItem, { value: "O" }, "Otro")
            )
          )
        ),
        
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "weight", className: "flex items-center gap-2" },
            React.createElement(Weight, { size: 16 }),
            "Peso (kg)"
          ),
          React.createElement(Input, {
            id: "weight",
            name: "weight",
            type: "number",
            min: "0",
            max: "500",
            value: formData.weight,
            onChange: handleInputChange,
            required: true
          })
        ),
        
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "height", className: "flex items-center gap-2" },
            React.createElement(Ruler, { size: 16 }),
            "Altura (cm)"
          ),
          React.createElement(Input, {
            id: "height",
            name: "height",
            type: "number",
            min: "0",
            max: "300",
            value: formData.height,
            onChange: handleInputChange,
            required: true
          })
        )
      ),
      
      React.createElement('div', { className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4" },
        React.createElement('div', { className: "flex items-center space-x-2" },
          React.createElement(Checkbox, {
            id: "smoking",
            checked: formData.smoking,
            onCheckedChange: () => handleCheckboxChange("smoking")
          }),
          React.createElement(Label, { htmlFor: "smoking", className: "flex items-center gap-2" },
            React.createElement(Cigarette, { size: 16 }),
            "Fumador"
          )
        ),
        
        React.createElement('div', { className: "flex items-center space-x-2" },
          React.createElement(Checkbox, {
            id: "alcohol",
            checked: formData.alcohol,
            onCheckedChange: () => handleCheckboxChange("alcohol")
          }),
          React.createElement(Label, { htmlFor: "alcohol", className: "flex items-center gap-2" },
            React.createElement(Beer, { size: 16 }),
            "Consume alcohol"
          )
        ),
        
        React.createElement('div', { className: "flex items-center space-x-2" },
          React.createElement(Checkbox, {
            id: "drugs",
            checked: formData.drugs,
            onCheckedChange: () => handleCheckboxChange("drugs")
          }),
          React.createElement(Label, { htmlFor: "drugs", className: "flex items-center gap-2" },
            React.createElement(Pill, { size: 16 }),
            "Consume drogas"
          )
        )
      )
    ),

    // Síntomas - Sección con al menos 5 síntomas obligatorios
    React.createElement('div', { className: "bg-cyan-50 p-4 rounded-md border border-cyan-100" },
      React.createElement('div', { className: "flex justify-between items-center mb-4" },
        React.createElement('h3', { className: "font-medium text-cyan-800 flex items-center gap-2" },
          React.createElement(Stethoscope, { size: 18 }),
          "Síntomas"
        ),
        React.createElement('span', { 
          className: `text-sm ${selectedSymptoms >= 5 ? 'text-green-600' : 'text-red-500'} font-medium` 
        }, 
          `${selectedSymptoms} de 5 síntomas mínimos requeridos`
        )
      ),

      // Síntomas principales con escala de severidad
      React.createElement('div', { className: "space-y-4 mb-6" },
        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "primarySymptom" }, "Síntoma Principal"),
          React.createElement(Input, {
            id: "primarySymptom",
            name: "primarySymptom",
            value: formData.primarySymptom,
            onChange: handleInputChange,
            placeholder: "Describa el síntoma principal"
          }),
          React.createElement('div', { className: "space-y-2 mt-1" },
            React.createElement('div', { className: "flex justify-between text-sm text-gray-500" },
              React.createElement('span', null, "Leve"),
              React.createElement('span', null, "Moderado"),
              React.createElement('span', null, "Severo")
            ),
            React.createElement(Slider, {
              id: "severityLevel1",
              name: "severityLevel1",
              defaultValue: [1],
              min: 1,
              max: 5,
              step: 1,
              value: [formData.severityLevel1],
              onValueChange: (value) => handleSliderChange("severityLevel1", value),
              className: formData.primarySymptom ? "" : "opacity-50",
              disabled: !formData.primarySymptom
            })
          )
        ),

        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "secondarySymptom" }, "Síntoma Secundario"),
          React.createElement(Input, {
            id: "secondarySymptom",
            name: "secondarySymptom",
            value: formData.secondarySymptom,
            onChange: handleInputChange,
            placeholder: "Describa un síntoma secundario"
          }),
          React.createElement('div', { className: "space-y-2 mt-1" },
            React.createElement('div', { className: "flex justify-between text-sm text-gray-500" },
              React.createElement('span', null, "Leve"),
              React.createElement('span', null, "Moderado"),
              React.createElement('span', null, "Severo")
            ),
            React.createElement(Slider, {
              id: "severityLevel2",
              name: "severityLevel2",
              defaultValue: [1],
              min: 1,
              max: 5,
              step: 1,
              value: [formData.severityLevel2],
              onValueChange: (value) => handleSliderChange("severityLevel2", value),
              className: formData.secondarySymptom ? "" : "opacity-50",
              disabled: !formData.secondarySymptom
            })
          )
        ),

        React.createElement('div', { className: "space-y-2" },
          React.createElement(Label, { htmlFor: "tertiarySymptom" }, "Síntoma Terciario"),
          React.createElement(Input, {
            id: "tertiarySymptom",
            name: "tertiarySymptom",
            value: formData.tertiarySymptom,
            onChange: handleInputChange,
            placeholder: "Describa otro síntoma importante"
          }),
          React.createElement('div', { className: "space-y-2 mt-1" },
            React.createElement('div', { className: "flex justify-between text-sm text-gray-500" },
              React.createElement('span', null, "Leve"),
              React.createElement('span', null, "Moderado"),
              React.createElement('span', null, "Severo")
            ),
            React.createElement(Slider, {
              id: "severityLevel3",
              name: "severityLevel3",
              defaultValue: [1],
              min: 1,
              max: 5,
              step: 1,
              value: [formData.severityLevel3],
              onValueChange: (value) => handleSliderChange("severityLevel3", value),
              className: formData.tertiarySymptom ? "" : "opacity-50",
              disabled: !formData.tertiarySymptom
            })
          )
        )
      ),

      // Síntomas adicionales en grid
      React.createElement('div', { className: "border-t border-cyan-200 pt-4" },
        React.createElement('h4', { className: "text-sm font-medium text-cyan-700 mb-3" }, "Síntomas adicionales"),
        React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2" },
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "fever",
              checked: formData.fever,
              onCheckedChange: () => handleCheckboxChange("fever")
            }),
            React.createElement(Label, { htmlFor: "fever", className: "flex items-center gap-2" },
              React.createElement(Thermometer, { size: 16 }),
              "Fiebre"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "rash",
              checked: formData.rash,
              onCheckedChange: () => handleCheckboxChange("rash")
            }),
            React.createElement(Label, { htmlFor: "rash" }, "Sarpullido")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "cough",
              checked: formData.cough,
              onCheckedChange: () => handleCheckboxChange("cough")
            }),
            React.createElement(Label, { htmlFor: "cough" }, "Tos")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "skinEruptions",
              checked: formData.skinEruptions,
              onCheckedChange: () => handleCheckboxChange("skinEruptions")
            }),
            React.createElement(Label, { htmlFor: "skinEruptions" }, "Erupciones cutáneas")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "nightSweats",
              checked: formData.nightSweats,
              onCheckedChange: () => handleCheckboxChange("nightSweats")
            }),
            React.createElement(Label, { htmlFor: "nightSweats", className: "flex items-center gap-2" },
              React.createElement(Moon, { size: 16 }),
              "Sudoración nocturna"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "bloodInUrine",
              checked: formData.bloodInUrine,
              onCheckedChange: () => handleCheckboxChange("bloodInUrine")
            }),
            React.createElement(Label, { htmlFor: "bloodInUrine", className: "flex items-center gap-2" },
              React.createElement(Droplets, { size: 16 }),
              "Sangre en la orina"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "bloodInStool",
              checked: formData.bloodInStool,
              onCheckedChange: () => handleCheckboxChange("bloodInStool")
            }),
            React.createElement(Label, { htmlFor: "bloodInStool" }, "Sangre en heces")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "constipation",
              checked: formData.constipation,
              onCheckedChange: () => handleCheckboxChange("constipation")
            }),
            React.createElement(Label, { htmlFor: "constipation" }, "Estreñimiento")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "nausea",
              checked: formData.nausea,
              onCheckedChange: () => handleCheckboxChange("nausea")
            }),
            React.createElement(Label, { htmlFor: "nausea" }, "Náuseas")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "headache",
              checked: formData.headache,
              onCheckedChange: () => handleCheckboxChange("headache")
            }),
            React.createElement(Label, { htmlFor: "headache", className: "flex items-center gap-2" },
              React.createElement(BrainCircuit, { size: 16 }),
              "Dolor de cabeza"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "abdominalPain",
              checked: formData.abdominalPain,
              onCheckedChange: () => handleCheckboxChange("abdominalPain")
            }),
            React.createElement(Label, { htmlFor: "abdominalPain", className: "flex items-center gap-2" },
              React.createElement(HeartPulse, { size: 16 }),
              "Dolor abdominal"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "insomnia",
              checked: formData.insomnia,
              onCheckedChange: () => handleCheckboxChange("insomnia")
            }),
            React.createElement(Label, { htmlFor: "insomnia", className: "flex items-center gap-2" },
              React.createElement(Moon, { size: 16 }),
              "Insomnio"
            )
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "fatigue",
              checked: formData.fatigue,
              onCheckedChange: () => handleCheckboxChange("fatigue")
            }),
            React.createElement(Label, { htmlFor: "fatigue" }, "Fatiga")
          ),
          
          React.createElement('div', { className: "flex items-center space-x-2" },
            React.createElement(Checkbox, {
              id: "diarrhea",
              checked: formData.diarrhea,
              onCheckedChange: () => handleCheckboxChange("diarrhea")
            }),
            React.createElement(Label, { htmlFor: "diarrhea" }, "Diarrea")
          )
        )
      ),
      
      // Síntomas adicionales en texto
      React.createElement('div', { className: "mt-4" },
        React.createElement(Label, { htmlFor: "additionalSymptoms", className: "flex items-center gap-2 mb-2" },
          React.createElement(ScrollText, { size: 16 }),
          "Otros síntomas o notas"
        ),
        React.createElement(Textarea, {
          id: "additionalSymptoms",
          name: "additionalSymptoms",
          rows: 3,
          value: formData.additionalSymptoms,
          onChange: handleInputChange,
          placeholder: "Describa cualquier otro síntoma o información relevante...",
          className: "resize-none"
        })
      )
    ),

    // Botón de envío
    React.createElement(Button, {
      type: "submit",
      className: `w-full mt-6 ${formIsValid ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-400 cursor-not-allowed'}`,
      disabled: isLoading || !formIsValid
    }, isLoading ? "Procesando..." : "Generar Diagnóstico"),
    
    !formIsValid && React.createElement('p', { className: "text-red-500 text-sm text-center" },
      formData.patientId && formData.patientName && formData.age && formData.sex && formData.weight && formData.height
        ? `Debe seleccionar al menos 5 síntomas (actualmente: ${selectedSymptoms})`
        : "Complete todos los campos de información básica del paciente"
    )
  );
};

export default DiagnosisForm;