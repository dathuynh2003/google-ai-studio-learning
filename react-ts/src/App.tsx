import { useState } from "react";
import { summarizeVideo } from "./api/gemini";
import { Video, Upload, Loader2, FileText, Sparkles } from "lucide-react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!file) return alert("Hãy chọn video!");
    setLoading(true);
    setSummary("");
    try {
      const result = await summarizeVideo(file);
      setSummary(result);
    } catch (e) {
      console.error(e);
      setSummary("Có lỗi xảy ra khi gọi API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
      display: 'flex',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      width: '100vw'
    }}>
      {/* Left Panel - Upload (30%) */}
      <div style={{
        width: '30vw',
        minWidth: '30vw',
        maxWidth: '30vw',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid #e2e8f0',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        flexShrink: 0
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          padding: '2rem',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Video size={28} />
            </div>
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: '0 0 0.5rem 0'
          }}>
            Gemini 2.5 Pro
          </h1>
          <p style={{
            fontSize: '0.9rem',
            opacity: 0.9,
            margin: 0
          }}>
            Video Summarizer
          </p>
        </div>

        {/* Upload Section */}
        <div style={{ 
          padding: '2rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            border: '2px dashed #0ea5e9',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            background: '#f0f9ff'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Upload size={32} color="#0ea5e9" />
            </div>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#0c4a6e',
              margin: '0 0 0.5rem 0'
            }}>
              Tải lên video
            </h3>
            <p style={{
              color: '#64748b',
              fontSize: '0.9rem',
              margin: '0 0 1.5rem 0'
            }}>
              Chọn file video để tóm tắt
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{
                display: 'block',
                margin: '0 auto',
                padding: '0.75rem',
                border: '1px solid #0ea5e9',
                borderRadius: '8px',
                background: 'white',
                fontSize: '0.9rem',
                width: '100%'
              }}
            />
            {file && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#dcfce7',
                borderRadius: '8px',
                border: '1px solid #16a34a'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={16} color="#16a34a" style={{ marginRight: '0.5rem' }} />
                  <span style={{ color: '#16a34a', fontWeight: '500', fontSize: '0.9rem' }}>
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleSummarize}
            disabled={!file || loading}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(14, 165, 233, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.4)';
              }
            }}
          >
            {loading ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Đang xử lý...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Tóm tắt video
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Panel - Results (70%) */}
      <div style={{
        width: '70vw',
        minWidth: '70vw',
        maxWidth: '70vw',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Results Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          padding: '2rem',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '0.75rem',
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={24} color="white" />
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: 0
            }}>
              Kết quả tóm tắt
            </h2>
          </div>
        </div>

        {/* Results Content */}
        <div style={{
          flex: 1,
          padding: '2rem',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '50%',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Loader2 size={48} color="#0ea5e9" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
              <p style={{ 
                margin: 0, 
                fontWeight: '500', 
                fontSize: '1.1rem',
                textAlign: 'center'
              }}>
                Đang xử lý video...
              </p>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.9rem',
                opacity: 0.7,
                textAlign: 'center'
              }}>
                Vui lòng chờ trong giây lát
              </p>
            </div>
          ) : summary ? (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #e0f2fe',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              width: '100%',
              height: '100%',
              overflowY: 'auto'
            }}>
              <p style={{
                color: '#374151',
                lineHeight: '1.8',
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontSize: '1.1rem'
              }}>
                {summary}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '1.2rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: 'white',
                    borderRadius: '50%',
                    padding: '2rem',
                    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)'
                  }}>
                    <FileText size={64} color="#0ea5e9" />
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: '500' }}>
                  Tải lên video và nhấn "Tóm tắt video" để xem kết quả
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
