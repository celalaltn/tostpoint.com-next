'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

export default function FranchiseViewer() {
  useEffect(() => {
    // PDF.js setup - exactly as in original
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
    script.onload = () => {
      // @ts-expect-error - pdfjsLib is loaded dynamically
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
      
      const url = '/html/franchaise.pdf';
      
      let pdfDoc: unknown = null,
          pageNum = 1,
          pageRendering = false,
          pageNumPending: number | null = null;
      
      let scale = 1.5;
      
      const container = document.getElementById('pdf-viewer-container');
      const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');
      const pageNumSpan = document.getElementById('page-num');
      const pageCountSpan = document.getElementById('page-count');
      
      function renderPage(num: number) {
        pageRendering = true;
        (pdfDoc as any).getPage(num).then(function(page: any) {
          if (container) {
            scale = container.clientWidth / page.getViewport({ scale: 1 }).width;
          }
          const viewport = page.getViewport({ scale: scale });
          if (canvas) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
          }
      
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          const renderTask = page.render(renderContext);
      
          renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
              renderPage(pageNumPending);
              pageNumPending = null;
            }
          });
        });
      
        if (pageNumSpan) {
          pageNumSpan.textContent = num.toString();
        }
      }
      
      function queueRenderPage(num: number) {
        if (pageRendering) {
          pageNumPending = num;
        } else {
          renderPage(num);
        }
      }
      
      function onPrevPage() {
        if (pageNum <= 1) {
          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
      }
      
      function onNextPage() {
        if (pageNum >= (pdfDoc as any).numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
      }
      
      const prevButton = document.getElementById('prev-page');
      const nextButton = document.getElementById('next-page');
      
      if (prevButton) {
        prevButton.addEventListener('click', onPrevPage);
      }
      if (nextButton) {
        nextButton.addEventListener('click', onNextPage);
      }
      
      // @ts-expect-error - pdfjsLib is loaded dynamically
      window.pdfjsLib.getDocument(url).promise.then(function(pdfDoc_: unknown) {
        pdfDoc = pdfDoc_;
        if (pageCountSpan) {
          pageCountSpan.textContent = (pdfDoc as any).numPages.toString();
        }
        renderPage(pageNum);
      });
    };
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>TostPoint Franchise Dosyası</title>
      </Head>
      
      <div id="pdf-viewer-container">
        <canvas id="pdf-canvas"></canvas>
      </div>
      
      <div className="navigation-controls">
        <button id="prev-page">Önceki</button>
        <span id="page-indicator">
          <span id="page-num"></span> / <span id="page-count"></span>
        </span>
        <button id="next-page">Sonraki</button>
      </div>
      
      <style jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          background-color: #fab914;
          font-family: sans-serif;
          width: 100%;
          height: 100%;
        }

        #pdf-viewer-container {
          width: 100%;
          height: calc(100% - 70px);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
        }

        #pdf-canvas {
          border: 1px solid #000;
          max-width: 100%;
          max-height: 100%;
          height: auto;
          display: block;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }

        .navigation-controls {
          background-color: #fab914;
          box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
          width: 100%;
          position: fixed;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          box-sizing: border-box;
        }

        #page-indicator {
          color: #000;
          font-weight: bold;
          font-size: 16px;
        }

        .navigation-controls a {
          text-decoration: none;
        }

        .navigation-controls button, .navigation-controls a {
          background-color: #000000;
          color: #fab914;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin: 0 10px;
          border-radius: 5px;
          font-weight: bold;
        }

        .navigation-controls button:disabled {
          background-color: #555;
          color: #888;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
