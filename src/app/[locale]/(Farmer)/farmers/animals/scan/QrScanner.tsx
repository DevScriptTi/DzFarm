'use client';

import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false // <--- verbose mode off
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
      },
      (error) => {
        if (onScanFailure) onScanFailure(error);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess, onScanFailure]);


  return <div ref={scannerRef} id="qr-reader" />;
};

export default QrScanner;
