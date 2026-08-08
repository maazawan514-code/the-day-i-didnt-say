import React, { useState } from 'react';
import { Post } from '../types';
import { Rss, X, Copy, Check } from 'lucide-react';

interface RSSModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
}

export const RSSModal: React.FC<RSSModalProps> = ({ isOpen, onClose, posts }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate valid RSS 2.0 XML string
  const generateRSS = () => {
    const items = posts
      .map(
        (p) => `  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>https://thedayididntsay.blog/entry/${p.slug}</link>
    <description><![CDATA[${p.excerpt}]]></description>
    <category>${p.category}</category>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  </item>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>The Day I Didn't Say</title>
  <link>https://thedayididntsay.blog</link>
  <description>Poetry • Letters • Essays — A quiet journal of unspoken thoughts.</description>
  <language>en-us</language>
${items}
</channel>
</rss>`;
  };

  const xmlContent = generateRSS();

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#DDD7CC] rounded-2xl shadow-xl p-6 flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD7CC]">
          <div className="flex items-center space-x-2 text-[#A67C52]">
            <Rss className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-[#2B2B2B]">
              RSS Feed Specification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#EFEDE8] text-[#666666] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#666666] my-3 font-body">
          Subscribe in NetNewsWire, Feedly, or your favorite open-source RSS reader.
        </p>

        {/* XML Code Box */}
        <div className="relative flex-1 overflow-hidden my-2 rounded-xl bg-[#2B2B2B] text-[#F8F7F4] border border-[#DDD7CC] p-4 font-mono text-xs overflow-y-auto">
          <pre>{xmlContent}</pre>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs text-[#A67C52] font-serif italic">
            Syndicated automatically from static posts
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#A67C52] hover:bg-[#8C6842] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied XML' : 'Copy RSS XML'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
