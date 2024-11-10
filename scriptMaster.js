// makes sure js files load one after another

function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}

async function loadScripts() {
  try {
    await loadScript('contentLoader.js');
    console.log('contentLoader.js loaded');
    await loadScript('interactions.js');
    console.log('interactions.js loaded');
  } catch (error) {
    console.error(error);
  }
}

loadScripts();
