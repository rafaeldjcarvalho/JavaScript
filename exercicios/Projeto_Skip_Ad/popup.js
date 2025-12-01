const button = document.getElementById('detectar');

button.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {

      function clicarSeExistir() {
        const skipButton = document.querySelector('.ytp-skip-ad-button');
        if (skipButton) {
          skipButton.click();
          console.log('🟢 Anúncio pulado!');
        } else {
          console.log('🔍 Nenhum botão de pular encontrado...');
        }
      }

      // Usa MutationObserver para detectar quando o botão aparece
      const observer = new MutationObserver(() => {
        clicarSeExistir();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Backup com checagem periódica
      setInterval(clicarSeExistir, 1000);

      console.log('🚀 Observando anúncios para pular...');
    }
  });
});
