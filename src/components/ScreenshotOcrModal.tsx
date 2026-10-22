import React, { useState, useRef } from 'react';
import { KeywordItem, SearchIntent, WaterfallCluster } from '../types/seo';
import { 
  UploadCloud, Sparkles, Image as ImageIcon, X, Check, 
  AlertTriangle, Loader2, ArrowRight, ShieldCheck, RefreshCw 
} from 'lucide-react';

interface ScreenshotOcrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportKeywords: (newKeywords: KeywordItem[]) => void;
}

export const ScreenshotOcrModal: React.FC<ScreenshotOcrModalProps> = ({
  isOpen,
  onClose,
  onImportKeywords,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedItems, setExtractedItems] = useState<KeywordItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunOcr = async (usePreset = false) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    try {
      let bodyData: any = {};
      if (usePreset || !previewUrl) {
        bodyData = {
          notes: 'Extracting Ubersuggest "Waterfalls Near Nashik" screenshot table data',
        };
      } else {
        bodyData = {
          imageBase64: previewUrl,
          mimeType: selectedFile?.type || 'image/png',
          notes: 'User uploaded screenshot',
        };
      }

      const res = await fetch('/api/extract-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data.keywords || data.keywords.length === 0) {
        throw new Error('No keywords could be extracted from this image');
      }

      const mapped: KeywordItem[] = data.keywords.map((kw: any, idx: number) => {
        const vol = typeof kw.volume === 'number' ? kw.volume : parseInt(kw.volume, 10) || 0;
        const isGeoExcluded = kw.phrase.toLowerCase().includes('chennai') || kw.phrase.toLowerCase().includes('hosur');
        
        let relScore = isGeoExcluded ? 0.0 : 8.5;
        let oppScore = isGeoExcluded ? 12.0 : 75.0;
        if (vol >= 5000) oppScore += 10;
        else if (vol >= 500) oppScore += 15;

        return {
          id: `ocr-${Date.now()}-${idx}`,
          phrase: kw.phrase,
          volume: vol,
          volumeDisplay: vol.toLocaleString(),
          keywordDifficulty: 'Unknown',
          intent: (kw.intent as SearchIntent) || 'Informational',
          cluster: (kw.cluster as WaterfallCluster) || (isGeoExcluded ? 'Out of Scope / Irrelevant Geo' : 'Waterfalls near Nashik'),
          location: isGeoExcluded ? 'Irrelevant (Chennai/Other)' : (kw.phrase.toLowerCase().includes('district') ? 'Nashik District / Ghats' : 'Nashik'),
          relevanceScore: relScore,
          opportunityScore: Math.min(100, oppScore),
          confidenceLevel: isGeoExcluded ? 'High' : (kw.isTruncated ? 'Medium' : 'High'),
          priorityTier: isGeoExcluded ? 'Excluded (Out of Scope)' : (vol >= 200 ? 'P1 (Critical)' : 'P2 (High)'),
          isTruncated: Boolean(kw.isTruncated),
          isBookmarked: false,
          suggestedPageType: isGeoExcluded ? 'Excluded from Nashik Campaign' : 'Travel Article / Guide',
          suggestedUrlSlug: `/${kw.phrase.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/`,
          notes: kw.notes || (kw.isTruncated ? 'Extracted with truncation flag' : 'Extracted via OCR'),
          source: 'AI OCR',
        };
      });

      setExtractedItems(mapped);
      setSelectedItemIds(mapped.map(m => m.id));
      setSuccessInfo(`Successfully extracted ${mapped.length} keywords (${data.source === 'screenshot_fallback' ? 'Extracted from Ubersuggest dataset' : 'Gemini 3.8 Flash Vision OCR'})`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process screenshot');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedItemIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleConfirmImport = () => {
    const toImport = extractedItems.filter(item => selectedItemIds.includes(item.id));
    onImportKeywords(toImport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#faf8f5] w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#152e22] text-[#f7f5ef] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold">
                Screenshot Keyword Extractor (Gemini 3.8 Flash OCR)
              </h3>
              <p className="text-xs text-emerald-200/80">
                Upload your Ubersuggest, Ahrefs, or Semrush screenshot to extract keywords and volumes
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#1e4231] text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Upload or Sample Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white hover:bg-stone-50"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <UploadCloud className="w-8 h-8 text-emerald-700 mb-2" />
              <p className="text-sm font-semibold text-stone-800">
                {selectedFile ? selectedFile.name : 'Click to upload screenshot'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                PNG, JPG, or WebP up to 20MB
              </p>
              {previewUrl && (
                <div className="mt-3 relative w-full h-24 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Quick Demo Pre-set Option */}
            <div className="bg-[#1c3c2d]/10 border border-[#2b5841]/30 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  Instant Verification Demo
                </span>
                <h4 className="font-editorial text-base font-bold text-stone-900 mt-2">
                  Ubersuggest &quot;Waterfalls Near Nashik&quot; Dataset
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  Extracts all 14 visible rows including high-volume mobile queries, truncated terms (<code className="bg-amber-100 text-amber-900 px-1 rounded">Dudhsagar...</code>), zero-volume queries, and Chennai geo-mismatch segregation.
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleRunOcr(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Load Ubersuggest Dataset
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* If uploaded custom image, button to process */}
          {selectedFile && !extractedItems.length && (
            <div className="flex justify-end">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleRunOcr(false)}
                className="py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold flex items-center gap-2 shadow-md transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    Extracting Rows with Gemini 3.8 Flash...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Extract Keywords from Uploaded Image
                  </>
                )}
              </button>
            </div>
          )}

          {/* Feedback messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successInfo && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successInfo}</span>
              </div>
              <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                {selectedItemIds.length} of {extractedItems.length} Selected
              </span>
            </div>
          )}

          {/* Review Extracted Keywords Table */}
          {extractedItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Review Extracted Keywords Before Importing ({extractedItems.length} rows)
                </h4>
                <div className="flex gap-2 text-xs">
                  <button 
                    onClick={() => setSelectedItemIds(extractedItems.map(x => x.id))}
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    Select All
                  </button>
                  <span className="text-stone-300">|</span>
                  <button 
                    onClick={() => setSelectedItemIds([])}
                    className="text-stone-500 hover:underline"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden bg-white max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-600 font-semibold sticky top-0 border-b border-stone-200">
                    <tr>
                      <th className="p-2.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItemIds.length === extractedItems.length}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedItemIds(extractedItems.map(x => x.id));
                            else setSelectedItemIds([]);
                          }}
                        />
                      </th>
                      <th className="p-2.5">Keyword Phrase</th>
                      <th className="p-2.5">Stated Volume</th>
                      <th className="p-2.5">Intent</th>
                      <th className="p-2.5">Assigned Cluster</th>
                      <th className="p-2.5">Geo & Flags</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {extractedItems.map((item) => {
                      const isSelected = selectedItemIds.includes(item.id);
                      return (
                        <tr 
                          key={item.id} 
                          onClick={() => handleToggleSelect(item.id)}
                          className={`cursor-pointer hover:bg-stone-50 transition-colors ${
                            isSelected ? 'bg-emerald-50/40' : ''
                          }`}
                        >
                          <td className="p-2.5 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelect(item.id)}
                            />
                          </td>
                          <td className="p-2.5 font-medium">
                            <span className="text-stone-900">{item.phrase}</span>
                            {item.isTruncated && (
                              <span className="ml-1.5 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold border border-amber-200">
                                Truncated
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 font-mono font-bold text-stone-700">
                            {item.volumeDisplay}
                          </td>
                          <td className="p-2.5">
                            <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px]">
                              {item.intent}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-600 text-[11px]">
                            {item.cluster}
                          </td>
                          <td className="p-2.5">
                            {item.cluster === 'Out of Scope / Irrelevant Geo' ? (
                              <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                                Out of Scope (Chennai)
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-medium">
                                Local Nashik
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            {extractedItems.length > 0 
              ? `${selectedItemIds.length} keyword(s) ready to import` 
              : 'Extract keywords from screenshot to add to your research database'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedItemIds.length === 0}
              onClick={handleConfirmImport}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#152e22] hover:bg-[#1c3c2d] text-white flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              Import {selectedItemIds.length} Keywords
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
