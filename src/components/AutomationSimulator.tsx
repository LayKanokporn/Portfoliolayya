import React, { useState } from 'react';

// Type definitions
interface InputData {
  invoiceNumber: string;
  processType: string;
}

interface ProcessingStep {
  step: number;
  message: string;
  completed: boolean;
}

interface ProcessOutput {
  status: string;
  vendor?: string;
  amount?: string;
  dueDate?: string;
  approvalRequired?: string;
  recordsProcessed?: string;
  duplicatesFound?: string;
  errorCount?: string;
  validationPassed?: string;
  reportType?: string;
  totalRecords?: string;
  fileSize?: string;
  recipients?: string;
}

interface ProcessResult extends ProcessOutput {
  invoiceNumber?: string;
  processTime?: string;
  timestamp?: string;
  message?: string;
}

interface ProcessType {
  name: string;
  steps: string[];
  output: ProcessOutput;
}

interface ProcessTypes {
  [key: string]: ProcessType;
}

const AutomationSimulator: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    invoiceNumber: '',
    processType: ''
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);

  const processTypes: ProcessTypes = {
    'invoice': {
      name: 'Invoice Processing',
      steps: [
        'Validating invoice format...',
        'Extracting invoice data...',
        'Checking vendor database...',
        'Calculating totals...',
        'Updating accounting system...',
        'Generating approval workflow...'
      ],
      output: {
        status: 'Success',
        vendor: 'ABC Company Ltd.',
        amount: '$1,250.00',
        dueDate: '2025-07-15',
        approvalRequired: 'Yes'
      }
    },
    'data': {
      name: 'Data Entry',
      steps: [
        'Parsing input data...',
        'Validating data format...',
        'Checking for duplicates...',
        'Applying business rules...',
        'Database insertion...',
        'Sending confirmation...'
      ],
      output: {
        status: 'Success',
        recordsProcessed: '1,247',
        duplicatesFound: '3',
        errorCount: '0',
        validationPassed: 'Yes'
      }
    },
    'report': {
      name: 'Report Generation',
      steps: [
        'Collecting data sources...',
        'Applying filters...',
        'Calculating metrics...',
        'Formatting report...',
        'Adding charts and graphs...',
        'Generating PDF output...'
      ],
      output: {
        status: 'Success',
        reportType: 'Monthly Sales Summary',
        totalRecords: '15,340',
        fileSize: '2.4 MB',
        recipients: '12 stakeholders'
      }
    }
  };

  const runAutomation = async (): Promise<void> => {
    if (!inputData.invoiceNumber || !inputData.processType) {
      setResult({
        status: 'Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsProcessing(true);
    setResult(null);
    setProcessingSteps([]);

    const selectedProcess: ProcessType = processTypes[inputData.processType];
    
    // Simulate processing steps
    for (let i = 0; i < selectedProcess.steps.length; i++) {
      await new Promise<void>(resolve => setTimeout(resolve, 800));
      setProcessingSteps(prev => [...prev, {
        step: i + 1,
        message: selectedProcess.steps[i],
        completed: true
      }]);
    }

    // Add final result
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    setResult({
      ...selectedProcess.output,
      invoiceNumber: inputData.invoiceNumber,
      processTime: `${(selectedProcess.steps.length * 0.8 + 0.5).toFixed(1)} seconds`,
      timestamp: new Date().toLocaleTimeString()
    });
    
    setIsProcessing(false);
  };

  const resetSimulator = (): void => {
    setInputData({ invoiceNumber: '', processType: '' });
    setResult(null);
    setProcessingSteps([]);
    setIsProcessing(false);
  };

  const handleInputChange = (field: keyof InputData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setInputData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
      <h3 className="text-2xl font-bold mb-6 text-center text-white">Try My Automation Logic</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          <h4 className="font-semibold mb-4 text-cyan-300">Process Input Simulator</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter invoice number..."
              value={inputData.invoiceNumber}
              onChange={handleInputChange('invoiceNumber')}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all text-white placeholder-gray-400"
              disabled={isProcessing}
            />
            <select
              value={inputData.processType}
              onChange={handleInputChange('processType')}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all text-white"
              disabled={isProcessing}
            >
              <option value="">Select process type...</option>
              <option value="invoice">Invoice Processing</option>
              <option value="data">Data Entry</option>
              <option value="report">Report Generation</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={runAutomation}
                disabled={isProcessing}
                className="flex-1 p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-transform font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>🤖 Run Automation</>
                )}
              </button>
              <button
                onClick={resetSimulator}
                disabled={isProcessing}
                className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔄
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <h4 className="font-semibold mb-4 text-cyan-300">Expected Output</h4>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 min-h-[200px]">
            {/* Processing Steps */}
            {processingSteps.length > 0 && (
              <div className="space-y-2 mb-4">
                {processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-cyan-200/80">{step.message}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                Processing automation...
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="space-y-3">
                {result.status === 'Success' ? (
                  <>
                    <div className="text-green-400 font-medium flex items-center gap-2">
                      <span>✅</span> Process completed successfully
                    </div>
                    
                    {/* Result Details */}
                    <div className="bg-white/5 p-3 rounded-lg space-y-2">
                      <div className="text-sm text-cyan-200/80">
                        <span className="font-medium">Invoice #:</span> {result.invoiceNumber}
                      </div>
                      {result.vendor && (
                        <div className="text-sm text-cyan-200/80">
                          <span className="font-medium">Vendor:</span> {result.vendor}
                        </div>
                      )}
                      {result.amount && (
                        <div className="text-sm text-cyan-200/80">
                          <span className="font-medium">Amount:</span> {result.amount}
                        </div>
                      )}
                      {result.recordsProcessed && (
                        <div className="text-sm text-cyan-200/80">
                          <span className="font-medium">Records:</span> {result.recordsProcessed}
                        </div>
                      )}
                      {result.reportType && (
                        <div className="text-sm text-cyan-200/80">
                          <span className="font-medium">Report:</span> {result.reportType}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-cyan-200/60 space-y-1 border-t border-white/10 pt-3">
                      <div>• Data validated and formatted</div>
                      <div>• Database updated</div>
                      <div>• Notification sent</div>
                      <div>• Report generated</div>
                      <div className="mt-3 text-cyan-400 flex justify-between">
                        <span>⚡ Processing time: {result.processTime}</span>
                        <span>🕒 {result.timestamp}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-red-400 font-medium flex items-center gap-2">
                    <span>❌</span> {result.message}
                  </div>
                )}
              </div>
            )}

            {/* Default State */}
            {!result && !isProcessing && processingSteps.length === 0 && (
              <div className="text-cyan-200/40 text-center py-8">
                Select a process type and enter data to see automation results
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Info */}
      <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="text-sm text-cyan-200/60 text-center">
          <span className="text-cyan-400 font-medium">Demo Features:</span> Real-time processing simulation • Error handling • Multi-format support • Detailed logging • Performance metrics
        </div>
      </div>
    </div>
  );
};

export default AutomationSimulator;