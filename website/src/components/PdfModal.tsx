"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfModalProps {
  url: string;
  onClose: () => void;
}

export default function PdfModal({ url, onClose }: PdfModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setContainerWidth(node.clientWidth);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-[90vw] h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
          {numPages && numPages > 1 ? (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <button
                onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                disabled={pageNumber <= 1}
                className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
              >
                ‹
              </button>
              <span>{pageNumber} / {numPages}</span>
              <button
                onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
              >
                ›
              </button>
            </div>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* PDF */}
        <div ref={containerRef} className="flex-1 overflow-y-auto flex justify-center bg-slate-50 p-4">
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="flex items-center justify-center h-full text-sm text-slate-500">
                Chargement…
              </div>
            }
            error={
              <div className="flex items-center justify-center h-full text-sm text-red-500">
                Impossible de charger le document.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth > 0 ? containerWidth - 32 : undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
