"use client";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

interface Props {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export default function QrScanner({ onScanSuccess, onScanError }: Props) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 300, height: 300 },
      rememberLastUsedCamera: true,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
      }
    };

    try {
      scannerRef.current = new Html5QrcodeScanner("qr-reader", config, true);
      
      const successHandler = (decodedText: string) => {
        setCameraError("");
        onScanSuccess(decodedText);
      };

      const errorHandler = (error: string) => {
        if (!error.includes("NotFoundException")) {
          setCameraError(error);
          onScanError?.(error);
        }
      };

      // Render the scanner - no .catch needed as it doesn't return a Promise
      scannerRef.current.render(successHandler, errorHandler);
    } catch (err) {
      setCameraError(`Scanner initialization failed: ${err instanceof Error ? err.message : String(err)}`);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="relative">
      <div id="qr-reader" className="w-full aspect-square" />
      {cameraError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg text-red-600">
            {cameraError.includes("Permission denied") 
              ? "Camera access denied. Please enable camera permissions."
              : cameraError}
          </div>
        </div>
      )}
    </div>
  );
}