import { useState } from "react";
import { Download, Link2, Loader2, Play, Music, Film, Check, AlertCircle } from "lucide-react";

type DownloadStatus = "idle" | "analyzing" | "ready" | "downloading" | "complete" | "error";

interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  qualities: { label: string; size: string }[];
}

const mockMediaInfo: MediaInfo = {
  title: "Amazing Video Title - Full HD Quality",
  thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop",
  duration: "3:45",
  platform: "YouTube",
  qualities: [
    { label: "1080p", size: "45 MB" },
    { label: "720p", size: "28 MB" },
    { label: "480p", size: "15 MB" },
    { label: "Audio", size: "4 MB" },
  ],
};

const DownloadInterface = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setStatus("analyzing");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Check for valid URL pattern
    if (url.includes("youtube") || url.includes("instagram") || url.includes("tiktok") || url.includes("facebook")) {
      setStatus("ready");
    } else {
      setStatus("error");
    }
  };

  const handleDownload = async () => {
    setStatus("downloading");
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("complete");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetDownload = () => {
    setStatus("idle");
    setUrl("");
    setDownloadProgress(0);
  };

  return (
    <section className="py-24" id="download">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Start Downloading
          </h2>
          <p className="text-lg text-muted-foreground">
            Paste any social media link and get your media in seconds
          </p>
        </div>

        {/* Main Download Card */}
        <div className="rounded-3xl border border-border bg-background p-8 shadow-xl">
          {/* URL Input */}
          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Link2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your link here..."
              disabled={status !== "idle" && status !== "error"}
              className="input-hero pl-14 disabled:opacity-50"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>

          {/* Action Button */}
          {(status === "idle" || status === "error") && (
            <button
              onClick={handleAnalyze}
              disabled={!url.trim()}
              className="btn-hero w-full disabled:opacity-50 disabled:hover:scale-100"
            >
              <Download className="h-5 w-5" />
              Analyze Link
            </button>
          )}

          {/* Analyzing State */}
          {status === "analyzing" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-foreground" />
              </div>
              <p className="text-muted-foreground">Analyzing your link...</p>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-destructive/10 p-4">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">
                Invalid or unsupported link. Please try a different URL.
              </p>
            </div>
          )}

          {/* Media Preview - Ready State */}
          {status === "ready" && (
            <div className="mt-8 animate-fade-in-up">
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={mockMediaInfo.thumbnail}
                    alt={mockMediaInfo.title}
                    className="h-40 w-full object-cover sm:h-32 sm:w-56"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                    <div className="rounded-full bg-background/90 p-3">
                      <Play className="h-6 w-6 text-foreground" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-foreground/80 px-2 py-1 text-xs font-medium text-background">
                    {mockMediaInfo.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {mockMediaInfo.platform}
                  </span>
                  <h3 className="mb-4 line-clamp-2 text-lg font-semibold text-foreground">
                    {mockMediaInfo.title}
                  </h3>

                  {/* Quality Selector */}
                  <div className="flex flex-wrap gap-2">
                    {mockMediaInfo.qualities.map((quality) => (
                      <button
                        key={quality.label}
                        onClick={() => setSelectedQuality(quality.label)}
                        className={`quality-btn flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                          selectedQuality === quality.label
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-foreground hover:border-foreground"
                        }`}
                      >
                        {quality.label === "Audio" ? (
                          <Music className="h-4 w-4" />
                        ) : (
                          <Film className="h-4 w-4" />
                        )}
                        {quality.label}
                        <span className="text-xs opacity-70">{quality.size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="btn-hero mt-6 w-full"
              >
                <Download className="h-5 w-5" />
                Download {selectedQuality}
              </button>
            </div>
          )}

          {/* Downloading State */}
          {status === "downloading" && (
            <div className="mt-8 animate-fade-in-up">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Downloading...</span>
                <span className="text-sm font-medium text-muted-foreground">{downloadProgress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-foreground transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Complete State */}
          {status === "complete" && (
            <div className="mt-8 animate-fade-in-up text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Download Complete!</h3>
              <p className="mb-6 text-muted-foreground">Your file has been saved successfully.</p>
              <button
                onClick={resetDownload}
                className="btn-hero"
              >
                Download Another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DownloadInterface;
