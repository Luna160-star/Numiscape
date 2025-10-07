 
  (function () {
    const KEY_COINS = "numescape_coins";
    const coinCountEl = document.getElementById("coinCount");
    const wellType = document.getElementById("wellType");
    const openBtn = document.getElementById("openWellBtn");
    const closeBtn = document.getElementById("closeWellBtn");
    const tossBtn = document.getElementById("tossBtn");
    const coinAnim = document.getElementById("coinAnim");
    const factText = document.getElementById("factText");

    const SPEND_COST = true; 

    const facts = [
      "Cleopatra was born closer to the iPhone than to the building of the Great Pyramid of Giza.",
      "Ancient Egyptian workers basically ate the world’s first pizza while building pyramids.",
      "Hannibal once marched elephants across the snowy Alps just to attack Rome.",
      "Electrum, a natural gold‑silver alloy, was used in early Lydian coins.",
      "Portraits on coins spread political messages across empires.",
      "Hammered coinage was standard before screw‑press technology.",
      "The CIA actually tried to turn a cat into a spy in the 1960s (it didn’t end well).",
      "The CIA actually tried to turn a cat into a spy in the 1960s (it didn’t end well)",
      
    ];

    


    //space for visibility

    function getCoins() { return Number(localStorage.getItem(KEY_COINS) || 0); }
    function setCoins(n) { localStorage.setItem(KEY_COINS, String(n)); render(); }
    function render() {
      coinCountEl.textContent = getCoins();
      tossBtn.disabled = (getCoins() <= 0 && SPEND_COST);
    }

    function openWell() { wellType.classList.add("show"); wellType.setAttribute("aria-hidden", "false"); }
    function closeWell() { wellType.classList.remove("show"); wellType.setAttribute("aria-hidden", "true"); factText.textContent = ""; coinAnim.classList.remove("drop"); }

    openBtn.addEventListener("click", openWell);
    closeBtn.addEventListener("click", closeWell);
    wellType.addEventListener("click", (e) => { if (e.target === wellType) closeWell(); });

    tossBtn.addEventListener("click", () => {
      if (SPEND_COST && getCoins() <= 0) return;
      if (SPEND_COST) setCoins(getCoins() - 1);

      coinAnim.classList.remove("drop");
      void coinAnim.offsetWidth; 
      coinAnim.classList.add("drop");

      setTimeout(() => {
        const pick = facts[Math.floor(Math.random() * facts.length)];
        factText.textContent = pick;
      }, 900);
    });

    render();
  })();

 //space for visibility

(function () {
  const KEY_COINS = "numescape_coins";
  const getCoins = () => Number(localStorage.getItem(KEY_COINS) || 0);
  const setCoins = (n) => localStorage.setItem(KEY_COINS, String(n));
 
  document.addEventListener("click", (e) => {
    const tile = e.target.closest(".coin-tile");
    if (!tile) return;
    setCoins(getCoins() + 1);
  
    tile.animate([{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 220, easing: "ease-out" });
   
    const el = document.getElementById("coinCount");
    if (el) el.textContent = getCoins();
  });
})();


(
function () {
  const KEY_COINS = "numescape_coins";
  const btn = document.getElementById("resetCoinsBtn");
  const counter = document.getElementById("coinCount");
  if (btn) {
    btn.addEventListener("click", () => {
      localStorage.setItem(KEY_COINS, "0");
      if (counter) counter.textContent = "0";
      
      sessionStorage.removeItem("numescape_session_started");
    });
  }
})();

