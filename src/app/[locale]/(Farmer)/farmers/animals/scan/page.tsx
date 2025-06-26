'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';
import { useLocale } from 'next-intl';

export default function QRScannerPage() {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const locale = useLocale()
    // Start scanning only after the DOM element is rendered
    useEffect(() => {
        if (scanning) {
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode('qr-reader');
            }
            scannerRef.current.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: 250,
                },
                (decodedText: string) => {
                    const match = decodedText.match(/(\d+)$/);
                    if (match) {
                        scannerRef.current?.stop();
                        setScanning(false);
                        router.push(`${locale}/farmers/animals/view/${match[1]}`);
                    }
                },
                () => { }
            ).catch(() => {
                setError('Error accessing camera');
                setScanning(false);
            });
        }
        // Cleanup on unmount or when scanning stops
        return () => {
            if (scannerRef.current && scanning) {
                scannerRef.current.stop().catch(() => { });
            }
        };
    }, [scanning, router]);

    const startScan = useCallback(() => {
        setError(null);
        setScanning(true);
    }, []);

    const stopScan = useCallback(() => {
        setScanning(false);
        scannerRef.current?.stop().catch(() => { });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]  p-6 rounded-lg shadow-md">
            <h1
                className="mb-6 text-[var(--color-primary)]"
                style={{
                    fontSize: 'var(--text-headline-large)',
                    fontWeight: 'var(--text-headline-large--font-weight)',
                }}
            >
                Scan Sheep QR Code
            </h1>
            {scanning && (
                <div className="mb-4 w-full max-w-xs rounded-lg overflow-hidden border border-[var(--color-outline)] bg-[var(--color-surface-container)]">
                    <div id="qr-reader" style={{ width: '100%' }} />
                </div>
            )}
            {error && (
                <div className="mb-2 text-[var(--color-error)]" style={{ fontSize: 'var(--text-body-medium)' }}>
                    {error}
                </div>
            )}
            <div className="flex gap-4 mb-6">
                <button
                    className="px-6 py-2 rounded bg-[var(--color-primary)] text-[var(--color-on-primary)] font-medium shadow transition hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)]"
                    style={{
                        fontSize: 'var(--text-title-medium)',
                        fontWeight: 'var(--text-title-medium--font-weight)',
                    }}
                    onClick={startScan}
                    disabled={scanning}
                >
                    Start
                </button>
                <button
                    className="px-6 py-2 rounded bg-[var(--color-error)] text-[var(--color-on-error)] font-medium shadow transition hover:bg-[var(--color-error-container)] hover:text-[var(--color-on-error-container)]"
                    style={{
                        fontSize: 'var(--text-title-medium)',
                        fontWeight: 'var(--text-title-medium--font-weight)',
                    }}
                    onClick={stopScan}
                    disabled={!scanning}
                >
                    Stop
                </button>
            </div>
            <a
                href={`${locale}/farmers/animals/`}
                className="text-[var(--color-primary)] underline hover:text-[var(--color-primary-container)]"
                style={{
                    fontSize: 'var(--text-body-large)',
                    fontWeight: 'var(--text-body-large--font-weight)',
                }}
            >
                ← Back to Animals
            </a>
        </div>
    );
}