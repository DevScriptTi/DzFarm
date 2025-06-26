"use client";
import { 
  Html5QrcodeScanner, 
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats 
} from "html5-qrcode";
import { useEffect, useRef } from "react";

interface Props {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QrScanner = ({ onScanSuccess, onScanError }: Props) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.AZTEC,
        Html5QrcodeSupportedFormats.CODABAR,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.DATA_MATRIX,
        Html5QrcodeSupportedFormats.MAXICODE,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.PDF_417,
        Html5QrcodeSupportedFormats.RSS_14,
        Html5QrcodeSupportedFormats.RSS_EXPANDED,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
      ]
    };

    scannerRef.current = new Html5QrcodeScanner("qr-reader", config, false);

    const successHandler = (decodedText: string) => {
      onScanSuccess(decodedText);
    };

    const errorHandler = (error: string) => {
      if (!error.includes("NotFoundException")) {
        onScanError?.(error);
      }
    };

    scannerRef.current.render(successHandler, errorHandler);

    return () => {
      scannerRef.current?.clear().catch(console.error);
    };
  }, [onScanSuccess, onScanError]);

  return <div id="qr-reader" className="w-full max-w-md" />;
};

export default QrScanner;