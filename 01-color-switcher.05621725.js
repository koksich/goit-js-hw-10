const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),d=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){a=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),e.disabled=!0,d.disabled=!1})),d.addEventListener("click",(function(){clearInterval(a),e.disabled=!1,d.disabled=!0})),d.disabled=!0;let a=null;
//# sourceMappingURL=01-color-switcher.05621725.js.map
