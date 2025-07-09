'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Copy, Download, Code, Terminal, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

// Simplified code editor using textarea
const CodeEditor = ({ value, onChange, language = 'javascript' }: { 
  value: string, 
  onChange: (value: string) => void, 
  language?: string 
}) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="// Escribe tu código aquí..."
        spellCheck={false}
        style={{
          lineHeight: '1.6',
          tabSize: 2,
          fontSize: '14px',
          fontFamily: 'Monaco, "Cascadia Code", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Code", "Droid Sans Mono", "Courier New", monospace'
        }}
      />
      <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
        {language}
      </div>
    </div>
  )
}

const initialCode = `// 🚀 ¡Bienvenido al Code Playground!
// Experimenta con JavaScript aquí

function createPortfolio() {
  const skills = ['React', 'Next.js', 'TypeScript', 'Three.js'];
  const passion = '💻 Desarrollo Frontend';
  
  return {
    developer: 'Esteban Inzunza',
    skills,
    passion,
    message: '¡Creando experiencias web increíbles!'
  };
}

// Ejecuta el código para ver el resultado
console.log(createPortfolio());

// 🎯 Prueba modificar el código y ejecutarlo
const myIdea = "Tu próximo proyecto aquí...";
console.log(myIdea);`

const codeExamples = [
  {
    name: 'React Component',
    code: `// Componente React moderno
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Counter;`
  },
  {
    name: 'Three.js Scene',
    code: `// Escena 3D básica con Three.js
import * as THREE from 'three';

function create3DScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000);
  
  // Crear un cubo
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  
  scene.add(cube);
  camera.position.z = 5;
  
  return { scene, camera, cube };
}

console.log('Escena 3D creada!');`
  },
  {
    name: 'Async/Await',
    code: `// JavaScript moderno con async/await
async function fetchUserData(userId) {
  try {
    console.log('Obteniendo datos del usuario...');
    
    // Simulamos una API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({
        id: userId,
        name: 'Esteban Inzunza',
        role: 'Frontend Developer',
        skills: ['React', 'TypeScript', 'Next.js']
      }), 1000)
    );
    
    console.log('Datos obtenidos:', response);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Ejecutar la función
fetchUserData(123);`
  }
]

export function CodePlayground() {
  const { t } = useTranslations()
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedExample, setSelectedExample] = useState<number | null>(null)

  const executeCode = () => {
    const newOutput: string[] = []
    
    // Override console.log to capture output
    const originalLog = console.log
    console.log = (...args) => {
      newOutput.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }

    try {
      // Execute the code safely
      const func = new Function(code)
      func()
      setOutput(newOutput)
    } catch (error) {
      setOutput([`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`])
    } finally {
      // Restore original console.log
      console.log = originalLog
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      // Could add a toast notification here
    } catch (error) {
      console.error('Error copying code:', error)
    }
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'playground-code.js'
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadExample = (index: number) => {
    setCode(codeExamples[index].code)
    setSelectedExample(index)
    setOutput([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 ${
        isExpanded ? 'fixed inset-4 z-50' : 'relative'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Code Playground</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            JavaScript
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyCode}>
            <Copy className="h-4 w-4 mr-1" />
            Copiar
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCode}>
            <Download className="h-4 w-4 mr-1" />
            Descargar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Examples selector */}
      <div className="p-4 bg-muted/10 border-b border-border">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedExample === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setCode(initialCode)
              setSelectedExample(null)
              setOutput([])
            }}
          >
            Inicio
          </Button>
          {codeExamples.map((example, index) => (
            <Button
              key={index}
              variant={selectedExample === index ? "default" : "outline"}
              size="sm"
              onClick={() => loadExample(index)}
            >
              {example.name}
            </Button>
          ))}
        </div>
      </div>

      <div className={`grid ${isExpanded ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-4 ${isExpanded ? 'h-[calc(100vh-200px)]' : 'h-96'}`}>
        {/* Code Editor */}
        <div className="relative">
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
          />
        </div>

        {/* Output Panel */}
        <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm overflow-auto rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span className="text-gray-300">Consola</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={executeCode}
              className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            >
              <Play className="h-4 w-4 mr-1" />
              Ejecutar
            </Button>
          </div>
          
          <div className="space-y-2">
            <AnimatePresence>
              {output.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500"
                >
                  $ Haz clic en &quot;Ejecutar&quot; para ver el resultado...
                </motion.div>
              ) : (
                output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="whitespace-pre-wrap"
                  >
                    <span className="text-gray-500">$ </span>
                    {line}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Backdrop for expanded mode */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
