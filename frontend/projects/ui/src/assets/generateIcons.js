// JSON data
const jsonData = {
  "data": {
    "getExtensionClassesForScopes": [
// add your data here
    ]
  }
};

// Function to generate a more complex, realistic icon
function generateComplexIcon(isDark = false) {
  const size = 100;
  const getColor = (base, range) => `rgb(${base + Math.floor(Math.random() * range)}, 
                                         ${base + Math.floor(Math.random() * range)}, 
                                         ${base + Math.floor(Math.random() * range)})`;
  
  const mainColor = isDark ? getColor(128, 127) : getColor(0, 200);
  const accentColor = isDark ? getColor(180, 75) : getColor(50, 150);

  // Generate a complex shape resembling a real-life icon
  const iconTypes = ['app', 'document', 'gear', 'chart', 'cloud', 'database', 'security', 'user', 'message', 'analytics'];
  const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];

  let iconSvg;
  switch (iconType) {
    case 'app':
      iconSvg = `
        <rect x="20" y="20" width="60" height="60" rx="15" fill="${mainColor}" />
        <circle cx="50" cy="50" r="20" fill="${accentColor}" />
        <rect x="45" y="40" width="10" height="20" rx="2" fill="${mainColor}" />
      `;
      break;
    case 'document':
      iconSvg = `
        <path d="M30 15 L70 15 L70 85 L30 85 Z" fill="${mainColor}" />
        <path d="M30 15 L55 15 L70 30 L70 85 L30 85 Z" fill="${mainColor}" />
        <path d="M55 15 L55 30 L70 30" fill="${accentColor}" />
        <rect x="40" y="45" width="30" height="5" rx="2" fill="${accentColor}" />
        <rect x="40" y="55" width="20" height="5" rx="2" fill="${accentColor}" />
        <rect x="40" y="65" width="25" height="5" rx="2" fill="${accentColor}" />
      `;
      break;
    case 'gear':
      iconSvg = `
        <circle cx="50" cy="50" r="25" fill="${mainColor}" />
        <path d="M50 25 L53 25 L55 30 L58 31 L62 28 L64 30 L62 34 L63 37 L68 38 L68 41 L63 43 L62 46 L64 50 L62 52 L58 49 L55 50 L53 55 L50 55 L48 50 L45 49 L41 52 L39 50 L41 46 L40 43 L35 41 L35 38 L40 37 L41 34 L39 30 L41 28 L45 31 L48 30 L50 25 Z" fill="${accentColor}" />
        <circle cx="50" cy="50" r="10" fill="${mainColor}" />
      `;
      break;
    case 'chart':
      iconSvg = `
        <rect x="20" y="20" width="60" height="60" rx="5" fill="${mainColor}" />
        <rect x="30" y="70" width="10" height="30" fill="${accentColor}" transform="rotate(180 35 85)" />
        <rect x="45" y="70" width="10" height="40" fill="${accentColor}" transform="rotate(180 50 85)" />
        <rect x="60" y="70" width="10" height="50" fill="${accentColor}" transform="rotate(180 65 85)" />
        <line x1="25" y1="30" x2="75" y2="30" stroke="${accentColor}" stroke-width="2" />
      `;
      break;
    case 'cloud':
      iconSvg = `
        <path d="M25 60 Q25 40 40 40 Q40 20 60 30 Q80 20 75 40 Q95 40 85 60 Z" fill="${mainColor}" />
        <circle cx="40" cy="60" r="10" fill="${accentColor}" />
        <circle cx="60" cy="60" r="10" fill="${accentColor}" />
      `;
      break;
    case 'database':
      iconSvg = `
        <ellipse cx="50" cy="25" rx="30" ry="15" fill="${mainColor}" />
        <rect x="20" y="25" width="60" height="50" fill="${mainColor}" />
        <ellipse cx="50" cy="75" rx="30" ry="15" fill="${mainColor}" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="${accentColor}" stroke-width="2" />
      `;
      break;
    case 'security':
      iconSvg = `
        <path d="M50 20 L80 35 L80 60 Q80 80 50 90 Q20 80 20 60 L20 35 Z" fill="${mainColor}" />
        <path d="M50 30 L70 40 L70 60 Q70 75 50 82 Q30 75 30 60 L30 40 Z" fill="${accentColor}" />
        <rect x="45" y="50" width="10" height="20" rx="2" fill="${mainColor}" />
        <circle cx="50" cy="50" r="5" fill="${mainColor}" />
      `;
      break;
    case 'user':
      iconSvg = `
        <circle cx="50" cy="35" r="20" fill="${mainColor}" />
        <path d="M20 90 Q20 60 50 60 Q80 60 80 90" fill="${mainColor}" />
        <circle cx="50" cy="35" r="15" fill="${accentColor}" />
      `;
      break;
    case 'message':
      iconSvg = `
        <rect x="20" y="30" width="60" height="40" rx="10" fill="${mainColor}" />
        <polygon points="30,70 40,80 50,70" fill="${mainColor}" />
        <circle cx="40" cy="50" r="5" fill="${accentColor}" />
        <circle cx="60" cy="50" r="5" fill="${accentColor}" />
      `;
      break;
    case 'analytics':
      iconSvg = `
        <rect x="20" y="20" width="60" height="60" rx="5" fill="${mainColor}" />
        <polyline points="30,70 45,40 60,55 75,30" fill="none" stroke="${accentColor}" stroke-width="3" />
        <circle cx="30" cy="70" r="4" fill="${accentColor}" />
        <circle cx="45" cy="40" r="4" fill="${accentColor}" />
        <circle cx="60" cy="55" r="4" fill="${accentColor}" />
        <circle cx="75" cy="30" r="4" fill="${accentColor}" />
      `;
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${iconSvg}</svg>`;
}

// Function to convert SVG to base64
function svgToBase64(svgString) {
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}

// Main function to update JSON with random icons
function updateJsonWithRandomIcons(jsonData) {
  const updatedData = JSON.parse(JSON.stringify(jsonData));
  
  updatedData.data.getExtensionClassesForScopes.forEach(item => {
    item.icon = {
      light: {
        url: null,
        data: svgToBase64(generateComplexIcon()),
        typename: "Image"
      },
      dark: {
        url: null,
        data: svgToBase64(generateComplexIcon(true)),
        typename: "Image"
      },
      typename: "Icon"
    };
  });

  return updatedData;
}

// Usage example
const updatedJson = updateJsonWithRandomIcons(jsonData);
console.log(JSON.stringify(updatedJson, null, 2));

// Function to copy the updated JSON to clipboard
function copyToClipboard(json) {
  if (navigator.clipboard && window.isSecureContext) {
    // Navigator Clipboard API method
    navigator.clipboard.writeText(JSON.stringify(json, null, 2))
      .then(() => console.log("Updated JSON copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  } else {
    // Fallback method using a temporary textarea
    const textArea = document.createElement("textarea");
    textArea.value = JSON.stringify(json, null, 2);
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      console.log("Updated JSON copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(textArea);
  }
}

// Copy the updated JSON to clipboard
copyToClipboard(updatedJson);