'use client';

import React, { useState } from 'react';
import QrScanner from './QrScanner';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const QrScanPage = () => {
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale()

  const handleSuccess = (decodedText: string) => {
    setResult(decodedText);
    
    // Redirect after scanning
    router.push(`/${locale}/farmers/animals/view/${decodedText}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-on-surface dark:text-dark-on-surface">QR Code Scanner</h1>
      {!result && <QrScanner onScanSuccess={handleSuccess} />}
      {result && (
        <div className="mt-4">
          <p className="text-green-600">✅ Scanned Result:</p>
          <pre className="bg-surface-container dark:bg-dark-surface-container p-2 rounded">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default QrScanPage;
