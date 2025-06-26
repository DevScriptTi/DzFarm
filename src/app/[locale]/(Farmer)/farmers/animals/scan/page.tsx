"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const QrScanner = dynamic(() => import("./QrCode"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <p>Loading scanner...</p>
    </div>
  )
});

export default function JoinPage() {
  const [result, setResult] = useState("");
  const [scanStatus, setScanStatus] = useState("Ready to scan");

  const handleSuccess = (data: string) => {
    setResult(data);
    setScanStatus("Scan successful!");
    console.log("QR Data:", data);
    // Add your processing logic here
  };

  const handleError = (error: string) => {
    if (!error.includes("NotFoundException")) {
      setScanStatus(`Error: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <QrScanner 
          onScanSuccess={handleSuccess}
          onScanError={handleError}
        />
      </div>

      <div className="mt-6 w-full max-w-md space-y-4">
        <div className={`p-3 rounded-lg ${
          result ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
        }`}>
          Status: {scanStatus}
        </div>
        
        {result && (
          <div className="bg-gray-50 p-4 rounded-lg break-all">
            <h2 className="font-semibold mb-2">Scanned Data:</h2>
            <p>{result}</p>
            <button
              onClick={() => {
                setResult("");
                setScanStatus("Ready to scan again");
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Scan Another Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}