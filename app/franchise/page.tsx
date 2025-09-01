import PDFViewer from '../components/PDFViewer';

export default function FranchisePage() {
  return (
    <div className="w-full h-screen">
      <PDFViewer pdfUrl="/html/franchaise.pdf" />
    </div>
  );
}
