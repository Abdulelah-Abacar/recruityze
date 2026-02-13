import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import Image from "next/image";
import { useTheme } from "next-themes";

const MarkdownPreview = ({ content }) => {
  const { theme } = useTheme();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [customStyles, setCustomStyles] = useState({});

  useEffect(() => {
    setCustomStyles({
      "--primary-color": theme === "dark" ? "#6bb6ff" : "#2563eb",
      "--text-color": theme === "dark" ? "#e2e8f0" : "#1a202c",
      "--bg-color": theme === "dark" ? "hsla(221, 39%, 11%, 0.95)" : "#ffffff",
      "--code-bg": theme === "dark" ? "#2d2d2d" : "#f8f8f8",
      "--border-color": theme === "dark" ? "#3f3f3f" : "#e2e8f0",
    });
  }, [theme]);

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const components = {
    img: ({ node, ...props }) => (
      <div className="image-container">
        <Image
          {...props}
          width={300}
          height={200}
          alt={props.alt || "Markdown image"}
          className="markdown-image"
          onClick={() => handleImageClick(props.src)}
        />
        {props.alt && <div className="image-caption">{props.alt}</div>}
      </div>
    ),
    a: ({ node, ...props }) => (
      <a
        {...props}
        className="markdown-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <div className="code-block-container">
          {match && <div className="language-tag">{match[1]}</div>}
          <code className={className} {...props}>
            {children}
          </code>
        </div>
      ) : (
        <code className="inline-code" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ node, ...props }) => (
      <h1 className="markdown-heading markdown-h1" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="markdown-heading markdown-h2" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="markdown-heading markdown-h3" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="markdown-heading markdown-h4" {...props} />
    ),
    h5: ({ node, ...props }) => (
      <h5 className="markdown-heading markdown-h5" {...props} />
    ),
    h6: ({ node, ...props }) => (
      <h6 className="markdown-heading markdown-h6" {...props} />
    ),
    hr: ({ node, ...props }) => <hr className="markdown-divider" {...props} />,
  };

  return (
    <div className="markdown-preview-container" style={customStyles}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>

      {zoomedImage && (
        <div className="image-modal" onClick={closeZoom}>
          <div className="image-modal-content">
            <Image
              width={300}
              height={200}
              src={zoomedImage}
              alt="Zoomed content"
            />
            <button className="close-button" onClick={closeZoom}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;
