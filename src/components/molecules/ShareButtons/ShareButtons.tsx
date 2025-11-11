import { motion } from "framer-motion";
import {
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Link2,
  Check,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const ShareButtons = ({
  url = window.location.href,
  title = "PibeLabs - Innovation Studio",
  description = "Transformamos ideas en productos digitales exitosos",
  className = "",
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + " " + url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("¡Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Error al copiar");
    }
  };

  const shareButtons = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: shareLinks.linkedin,
      color: "hover:bg-[#0077b5]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: shareLinks.twitter,
      color: "hover:bg-[#1da1f2]",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: shareLinks.facebook,
      color: "hover:bg-[#1877f2]",
    },
    {
      name: "Email",
      icon: Mail,
      href: shareLinks.email,
      color: "hover:bg-cyan-600",
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-gray-400 text-sm font-rajdhani">
        <Share2 size={18} />
        <span>Compartir:</span>
      </div>

      <div className="flex gap-2">
        {shareButtons.map((button) => (
          <motion.a
            key={button.name}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white transition-all ${button.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Share on ${button.name}`}
          >
            <button.icon size={18} />
          </motion.a>
        ))}

        <motion.button
          onClick={copyToClipboard}
          className="w-10 h-10 bg-white/10 hover:bg-cyan-600 rounded-lg flex items-center justify-center text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </motion.button>
      </div>
    </div>
  );
};

export default ShareButtons;
