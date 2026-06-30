export default function FormStatus({ status }) {
  if (status.submitted) {
    return (
      <div className="bg-teal-50 border border-teal-200 text-teal-800 px-5 py-4 rounded-xl flex items-start gap-3">
        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        <div>
          <p className="font-semibold text-sm">Message sent successfully!</p>
          <p className="text-sm text-teal-700 mt-1">Thank you for reaching out. I'll respond within 24 hours.</p>
        </div>
      </div>
    );
  }
  if (status.error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl flex items-start gap-3">
        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
        <div>
          <p className="font-semibold text-sm">Oops! Something went wrong</p>
          <p className="text-sm text-red-700 mt-1">{status.error}</p>
        </div>
      </div>
    );
  }
  return null;
}
