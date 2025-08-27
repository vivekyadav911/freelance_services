'use client'
import { useState } from 'react'

interface Tab {
  id: string
  title: string
  content: string
}

export default function TabsGenerator() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'tab1', title: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', title: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', title: 'Tab 3', content: 'Content for Tab 3' },
  ])
  
  const [generatedCode, setGeneratedCode] = useState('')

  const addTab = () => {
    const newTab: Tab = {
      id: `tab${tabs.length + 1}`,
      title: `Tab ${tabs.length + 1}`,
      content: `Content for Tab ${tabs.length + 1}`
    }
    setTabs([...tabs, newTab])
  }

  const updateTab = (index: number, field: 'title' | 'content', value: string) => {
    const updatedTabs = [...tabs]
    updatedTabs[index][field] = value
    setTabs(updatedTabs)
  }

  const removeTab = (index: number) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter((_, i) => i !== index))
    }
  }

  const generateHTML = () => {
    const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Tabs</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .tabs-container { max-width: 800px; margin: 0 auto; }
        .tab-buttons { display: flex; border-bottom: 2px solid #ddd; margin-bottom: 0; }
        .tab-button { 
            background: #f1f1f1; 
            border: none; 
            padding: 12px 24px; 
            cursor: pointer; 
            border-top: 3px solid transparent;
            transition: all 0.3s ease;
        }
        .tab-button:hover { background: #e1e1e1; }
        .tab-button.active { 
            background: white; 
            border-top-color: #007cba; 
            border-bottom: 2px solid white;
            margin-bottom: -2px;
        }
        .tab-content { 
            display: none; 
            padding: 20px; 
            border: 1px solid #ddd; 
            border-top: none; 
            background: white;
            min-height: 200px;
        }
        .tab-content.active { display: block; }
    </style>
</head>
<body>
    <div class="tabs-container">
        <div class="tab-buttons">
            ${tabs.map((tab, index) => 
                `<button class="tab-button${index === 0 ? ' active' : ''}" onclick="showTab('${tab.id}')">${tab.title}</button>`
            ).join('\n            ')}
        </div>
        ${tabs.map((tab, index) => 
            `<div id="${tab.id}" class="tab-content${index === 0 ? ' active' : ''}">${tab.content}</div>`
        ).join('\n        ')}
    </div>

    <script>
        function showTab(tabId) {
            // Hide all tabs
            var tabs = document.querySelectorAll('.tab-content');
            var buttons = document.querySelectorAll('.tab-button');
            
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });
            
            buttons.forEach(function(button) {
                button.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabId).classList.add('active');
            event.target.classList.add('active');
        }
    </script>
</body>
</html>`

    setGeneratedCode(htmlCode)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('Code copied to clipboard!')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">HTML Tabs Generator</h1>
      
      {/* Tab Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Configure Your Tabs</h2>
        
        {tabs.map((tab, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Tab {index + 1}</h3>
              {tabs.length > 1 && (
                <button
                  onClick={() => removeTab(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tab Title</label>
                <input
                  type="text"
                  value={tab.title}
                  onChange={(e) => updateTab(index, 'title', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tab Content</label>
                <textarea
                  value={tab.content}
                  onChange={(e) => updateTab(index, 'content', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex gap-4">
          <button
            onClick={addTab}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Tab
          </button>
          
          <button
            onClick={generateHTML}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Generate HTML
          </button>
        </div>
      </div>

      {/* Generated Code Output */}
      {generatedCode && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated HTML Code</h2>
            <button
              onClick={copyToClipboard}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Copy Code
            </button>
          </div>
          
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}
    </div>
  )
}