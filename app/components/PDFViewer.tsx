'use client';

import React, { useState, useEffect, useRef } from 'react';

// Dynamic import for pdfjs-dist to avoid SSR issues
const loadPDFJS = async () => {
  if (typeof window === 'undefined') return null;
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  return pdfjsLib;
};

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const flipBookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const loadScripts = async () => {
      // Load jQuery
      const $ = (await import('jquery')).default;
      (window as typeof window & { $: typeof $; jQuery: typeof $ }).$ = $;
      (window as typeof window & { $: typeof $; jQuery: typeof $ }).jQuery = $;
      
      // Load Turn.js
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/turn.js/3/turn.min.js';
      script.onload = () => {
        loadPDF();
      };
      document.head.appendChild(script);
    };

    const loadPDF = async () => {
      try {
        const pdfjsLib = await loadPDFJS();
        if (!pdfjsLib) return;
        
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setTotalPages(pdf.numPages);
        
        const pageImages: string[] = [];
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport
            }).promise;
            
            pageImages.push(canvas.toDataURL());
          }
        }
        
        setPages(pageImages);
        
        // Initialize Turn.js after pages are loaded
        setTimeout(() => {
          initializeTurnJS(pageImages);
        }, 100);
        
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    const initializeTurnJS = (pageImages: string[]) => {
      const $ = (window as typeof window & { $: typeof import('jquery').default }).$;
      if ($ && flipBookRef.current) {
        const $flipbook = $(flipBookRef.current);
        
        // Clear existing content
        $flipbook.empty();
        
        // Add pages
        pageImages.forEach((pageImage, index) => {
          const pageDiv = $(`
            <div class="page" style="background: white; display: flex; align-items: center; justify-content: center;">
              <img src="${pageImage}" alt="Page ${index + 1}" style="max-width: 100%; max-height: 100%; object-fit: contain;" draggable="false" />
            </div>
          `);
          $flipbook.append(pageDiv);
        });
        
        // Initialize Turn.js
        $flipbook.turn({
          width: 800,
          height: 600,
          autoCenter: true,
          acceleration: true,
          gradients: true,
          elevation: 50,
          when: {
            turned: function(event: Event, page: number) {
              setCurrentPage(page);
            }
          }
        });
      }
    };

    loadScripts();
  }, [pdfUrl, isClient]);

  const goToPrevPage = () => {
    const $ = (window as typeof window & { $: typeof import('jquery').default }).$;
    if ($ && flipBookRef.current) {
      $(flipBookRef.current).turn('previous');
    }
  };

  const goToNextPage = () => {
    const $ = (window as typeof window & { $: typeof import('jquery').default }).$;
    if ($ && flipBookRef.current) {
      $(flipBookRef.current).turn('next');
    }
  };

  if (!isClient) {
    return (
      <div className="w-full h-screen bg-[#fab914] flex items-center justify-center">
        <div className="text-black text-xl font-bold">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#fab914] flex flex-col">
      {/* PDF Flipbook Container */}
      <div className="flex-1 flex justify-center items-center overflow-hidden p-4">
        {pages.length > 0 ? (
          <div 
            ref={flipBookRef}
            id="flipbook"
            className="flipbook"
            style={{
              margin: '0 auto',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
              borderRadius: '8px'
            }}
          />
        ) : (
          <div className="text-black text-xl font-bold">PDF yükleniyor...</div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="bg-[#fab914] shadow-lg p-4 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="bg-black text-[#fab914] px-6 py-3 rounded-lg font-bold text-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Önceki
        </button>

        <span className="text-black font-bold text-xl">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="bg-black text-[#fab914] px-6 py-3 rounded-lg font-bold text-lg disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
        >
          Sonraki
        </button>
      </div>

      <style jsx global>{`
        .flipbook .page {
          background: white !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        .flipbook .even {
          background: linear-gradient(-90deg, #fff 0%, #f9f9f9 100%) !important;
        }
        
        .flipbook .odd {
          background: linear-gradient(90deg, #fff 0%, #f9f9f9 100%) !important;
        }
        
        .flipbook .turn-page {
          background-image: linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%) !important;
        }
      `}</style>
    </div>
  );
}
