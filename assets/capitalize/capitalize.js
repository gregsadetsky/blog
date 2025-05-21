// Script to add a capitalization toggle to your blog

// Function to add the toggle button
function addCapitalizeToggle() {
  // Create the toggle link
  const toggleLink = document.createElement("a");
  toggleLink.href = "#";
  toggleLink.id = "capitalize-toggle";
  toggleLink.style.fontSize = "12px"; // Very small as requested
  toggleLink.style.marginBottom = "10px";
  toggleLink.style.display = "inline-block";
  toggleLink.textContent = "(capitalize)";

  // Find the target container - specifically the post-content div
  const postContentDiv = document.querySelector("div.post-content.e-content");

  if (postContentDiv) {
    // Insert the toggle right before the post-content div
    postContentDiv.parentNode.insertBefore(toggleLink, postContentDiv);

    // Add event listener
    toggleLink.addEventListener("click", toggleCapitalization);
  }
}

// Function to capitalize text according to English rules
function capitalizeText(text) {
  if (!text) return text;

  // Split text into sentences
  return (
    text
      .replace(/([.!?]\s+|^)([a-z])/g, function (match, p1, p2) {
        return p1 + p2.toUpperCase();
      })
      // Capitalize standalone "i"
      .replace(/(\s|^)i(\s|$|[,.;:!?])/g, function (match, p1, p2) {
        return p1 + "I" + p2;
      })
  );
}

// Function to handle the toggling
function toggleCapitalization(e) {
  e.preventDefault();

  const toggle = document.getElementById("capitalize-toggle");
  const contentDiv = document.querySelector("div.post-content.e-content");
  const titleElement = document.querySelector("h1.post-title.p-name");

  // Function to apply capitalization to an element's text nodes
  function processElement(element) {
    if (!element) return;

    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false,
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim()) {
        textNodes.push(node);
      }
    }

    // Apply the appropriate text transformation
    if (toggle.textContent === "(capitalize)") {
      textNodes.forEach((node) => {
        node.nodeValue = capitalizeText(node.nodeValue);
      });
    } else {
      textNodes.forEach((node) => {
        node.nodeValue = node.nodeValue.toLowerCase();
      });
    }
  }

  // Toggle between capitalized and lowercase
  if (toggle.textContent === "(capitalize)") {
    // Process content and title with the same rules
    processElement(contentDiv);
    processElement(titleElement);
    toggle.textContent = "(decapitalize)";
  } else {
    // Process content and title with the same rules
    processElement(contentDiv);
    processElement(titleElement);
    toggle.textContent = "(capitalize)";
  }
}

// Initialize the toggle when the page loads
document.addEventListener("DOMContentLoaded", addCapitalizeToggle);
