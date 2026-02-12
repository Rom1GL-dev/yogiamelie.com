/**
 * Renders text with font-[Seasons], but wraps non-letter/non-number/non-space
 * characters (parentheses, apostrophes, hyphens, etc.) in font-sans
 * to avoid the DEMO watermark from the trial version of the Seasons font.
 */
export function SeasonsText({ children }: { children: string }) {
  const parts = children.split(/([^a-zA-Z0-9\u00C0-\u024F\s])/);
  return (
    <>
      {parts.map((part, i) =>
        /^[^a-zA-Z0-9\u00C0-\u024F\s]$/.test(part) ? (
          <span key={i} className="font-sans">{part}</span>
        ) : (
          part
        ),
      )}
    </>
  );
}
