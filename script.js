    const slides = [
      {
        type: "interactive",
        text: "TAP on the UNIT SQUARES to bring them together.<br><br>What would this make?",
        character: "assets/character1.png",
        characterAfterClick: "assets/character2.png",
        blocks: [
          { x: 250, y: 150, label: 1 },
          { x: 450, y: 350, label: 1 }
        ]
      },
      {
        type: "result",
        text: "Good job!<br><br>Now each rod is a count of '2'. This is a 2-unit rod.<br><br>Click NEXT to build further...",
        character: "assets/character3.png",
        rodValue: 2
      },
      {
        type: "interactive",
        text: "TAP on the 2-unit rods to bring them together.<br><br>What would this make?",
        character: "assets/character1.png",
        characterAfterClick: "assets/character2.png",
        blocks: [
          { x: 250, y: 150, label: 2 },
          { x: 450, y: 350, label: 2 }
        ]
      },
      {
        type: "result",
        text: "Good job!<br><br>That's 2 × 2 = 4<br><br>Click NEXT to explore how many rods of different lengths can be made by joining MULTIPLE 2-unit rods.",
        character: "assets/character3.png",
        rodValue: 4
      },
      {
        type: "slider",
        text: "Drag the slider to join more 2-unit Rods",
        //character: "assets/character3.png",
        multiplier: 2,
        max: 10
      },
      {
        type: "slider-result",
        text: "These lengths are all formed by joining rods of 2…",
        //character: "assets/character3.png",
        multiplier: 2,
        max: 10
      },
      {
        type: "slider-result",
        text: "These lengths are all formed by joining rods of 2…",
        //character: "assets/character3.png",
        multiplier: 2,
        max: 10
      },
      {
        type: "multiples-summary",
        text: "MULTIPLES of 2",
        //character: "assets/character3.png",
        multiplier: 2,
        max: 10
      }
      
    ];

    let currentSlide = 0;
    let clickedBlocks = [];

    function renderSlide(index) {
      const slide = slides[index];
      const container = document.getElementById("slide-container");
      container.innerHTML = "";

      // Always show Next button by default
      if (document.getElementById("nextBtn")) {
        document.getElementById("nextBtn").style.visibility = "visible";
      }

      const slideDiv = document.createElement("div");
      slideDiv.className = "slide";

      if (slide.type === "slider") {
        // --- SLIDER SLIDE DESIGN ---
        // No left panel for this slide
        const right = document.createElement("div");
        right.className = "right-panel";
        right.style.flex = "1 1 100%";
        right.style.margin = "0 auto";
        right.style.width = "100%";
        right.style.height = "100%";
        right.style.background = "none";

        // right.className = "unit-block";
        // right.style.left = block.x + "px";
        // right.style.top = block.y + "px";
        // right.dataset.index = idx;

        const sliderContainer = document.createElement("div");
        sliderContainer.style.width = "100%";
        sliderContainer.style.display = "flex";
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.alignItems = "center";
        sliderContainer.style.justifyContent = "center";
        sliderContainer.style.gap = "30px";
        sliderContainer.style.background = "rgba(0,0,0,0.15)";
        sliderContainer.style.borderRadius = "20px";
        sliderContainer.style.padding = "40px 0";

        // Equation at the top
        const equation = document.createElement("div");
        equation.className = "equation";
        equation.style.marginBottom = "10px";
        equation.style.fontSize = "64px";
        equation.style.fontWeight = "bold";
        let sliderValue = 2;
        equation.innerHTML = `${slide.multiplier} × <span class="highlight">${sliderValue}</span> = ${slide.multiplier * sliderValue}`;
        sliderContainer.appendChild(equation);

        // Rods row
        const rodsRow = document.createElement("div");
        rodsRow.style.display = "flex";
        rodsRow.style.alignItems = "flex-end";
        rodsRow.style.gap = "30px";
        rodsRow.style.marginBottom = "10px";
        rodsRow.style.marginTop = "20px";
        function renderRods(val) {
          rodsRow.innerHTML = "";
          for (let i = 1; i <= val; i++) {
            const rodCol = document.createElement("div");
            rodCol.style.display = "flex";
            rodCol.style.flexDirection = "column";
            rodCol.style.alignItems = "center";
            rodCol.style.position = "relative";
            // Top label
            const topLabel = document.createElement("div");
            topLabel.style.color = "white";
            topLabel.style.fontSize = "36px";
            topLabel.style.fontWeight = "bold";
            topLabel.style.marginBottom = "8px";
            topLabel.innerText = slide.multiplier * i;
            rodCol.appendChild(topLabel);
            // Rod block (long rectangle)
            const rodBlock = document.createElement("div");
            rodBlock.style.width = "60px";
            rodBlock.style.height = "40px";
            rodBlock.style.borderRadius = "12px";
            rodBlock.style.background = "white";
            rodBlock.style.border = "4px solid #2366cc";
            rodBlock.style.display = "flex";
            rodBlock.style.justifyContent = "center";
            rodBlock.style.alignItems = "center";
            rodBlock.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
            rodBlock.style.margin = "0";
            rodCol.appendChild(rodBlock);
            // Bottom label
            const botLabel = document.createElement("div");
            botLabel.style.color = "white";
            botLabel.style.fontSize = "28px";
            botLabel.style.fontWeight = "bold";
            botLabel.style.marginTop = "8px";
            botLabel.innerText = `${slide.multiplier}×${i}`;
            rodCol.appendChild(botLabel);
            rodsRow.appendChild(rodCol);
          }
        }
        renderRods(sliderValue);
        sliderContainer.appendChild(rodsRow);

        // Slider UI
        const sliderWrap = document.createElement("div");
        sliderWrap.style.display = "flex";
        sliderWrap.style.flexDirection = "column";
        sliderWrap.style.alignItems = "center";
        sliderWrap.style.marginTop = "30px";
        sliderWrap.style.background = "rgba(255,255,255,0.08)";
        sliderWrap.style.borderRadius = "16px";
        sliderWrap.style.padding = "24px 32px 16px 32px";
        // Slider label
        const sliderLabel = document.createElement("div");
        sliderLabel.style.fontSize = "32px";
        sliderLabel.style.fontWeight = "bold";
        sliderLabel.style.marginBottom = "10px";
        sliderLabel.innerText = slide.text;
        sliderWrap.appendChild(sliderLabel);
        // Slider bar
        const sliderBar = document.createElement("input");
        sliderBar.type = "range";
        sliderBar.min = 1;
        sliderBar.max = slide.max;
        sliderBar.value = sliderValue;
        sliderBar.style.width = "520px";
        sliderBar.style.margin = "0 0 10px 0";
        sliderBar.step = 1;
        sliderBar.style.accentColor = "#ffd700";
        sliderBar.style.height = "8px";
        sliderWrap.appendChild(sliderBar);
        // Slider ticks
        const ticks = document.createElement("div");
        ticks.style.display = "flex";
        ticks.style.justifyContent = "space-between";
        ticks.style.width = "520px";
        ticks.style.marginTop = "-8px";
        for (let i = 0; i <= slide.max; i++) {
          const tick = document.createElement("div");
          tick.style.textAlign = "center";
          tick.style.width = "32px";
          tick.style.color = "white";
          tick.style.fontSize = "28px";
          tick.style.opacity = i === sliderValue ? "1" : "0.5";
          tick.innerText = i;
          ticks.appendChild(tick);
        }
        sliderWrap.appendChild(ticks);
        sliderContainer.appendChild(sliderWrap);

        // Update rods, equation, and ticks on slider change
        sliderBar.addEventListener("input", (e) => {
          sliderValue = parseInt(sliderBar.value);
          renderRods(sliderValue);
          equation.innerHTML = `${slide.multiplier} × <span class=\"highlight\">${sliderValue}</span> = ${slide.multiplier * sliderValue}`;
          // Update tick highlight
          Array.from(ticks.children).forEach((tick, idx) => {
            tick.style.opacity = idx === sliderValue ? "1" : "0.5";
          });
        });

        // Only append right panel for this slide
        slideDiv.appendChild(right);
        right.appendChild(sliderContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        return;
      }


      if (slide.type === "slider") {
        // --- SLIDER SLIDE DESIGN ---
        // No left panel for this slide
        const right = document.createElement("div");
        right.className = "right-panel";
        right.style.flex = "1 1 100%";
        right.style.margin = "0 auto";
        right.style.width = "100%";
        right.style.background = "none";

        const sliderContainer = document.createElement("div");
        sliderContainer.style.width = "100%";
        sliderContainer.style.display = "flex";
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.alignItems = "center";
        sliderContainer.style.justifyContent = "center";
        sliderContainer.style.gap = "30px";
        sliderContainer.style.background = "rgba(0,0,0,0.15)";
        sliderContainer.style.borderRadius = "20px";
        sliderContainer.style.padding = "40px 0";

        // Equation at the top
        const equation = document.createElement("div");
        equation.className = "equation";
        equation.style.marginBottom = "10px";
        equation.style.fontSize = "64px";
        equation.style.fontWeight = "bold";
        let sliderValue = 2;
        equation.innerHTML = `${slide.multiplier} × <span class="highlight">${sliderValue}</span> = ${slide.multiplier * sliderValue}`;
        sliderContainer.appendChild(equation);

        // Rods row
        const rodsRow = document.createElement("div");
        rodsRow.style.display = "flex";
        rodsRow.style.alignItems = "flex-end";
        rodsRow.style.gap = "30px";
        rodsRow.style.marginBottom = "10px";
        rodsRow.style.marginTop = "20px";
        function renderRods(val) {
          rodsRow.innerHTML = "";
          for (let i = 1; i <= val; i++) {
            const rodCol = document.createElement("div");
            rodCol.style.display = "flex";
            rodCol.style.flexDirection = "column";
            rodCol.style.alignItems = "center";
            rodCol.style.position = "relative";
            // Top label
            const topLabel = document.createElement("div");
            topLabel.style.color = "white";
            topLabel.style.fontSize = "36px";
            topLabel.style.fontWeight = "bold";
            topLabel.style.marginBottom = "8px";
            topLabel.innerText = slide.multiplier * i;
            rodCol.appendChild(topLabel);
            // Rod block (long rectangle)
            const rodBlock = document.createElement("div");
            rodBlock.style.width = "60px";
            rodBlock.style.height = "40px";
            rodBlock.style.borderRadius = "12px";
            rodBlock.style.background = "white";
            rodBlock.style.border = "4px solid #2366cc";
            rodBlock.style.display = "flex";
            rodBlock.style.justifyContent = "center";
            rodBlock.style.alignItems = "center";
            rodBlock.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
            rodBlock.style.margin = "0";
            rodCol.appendChild(rodBlock);
            // Bottom label
            const botLabel = document.createElement("div");
            botLabel.style.color = "white";
            botLabel.style.fontSize = "28px";
            botLabel.style.fontWeight = "bold";
            botLabel.style.marginTop = "8px";
            botLabel.innerText = `${slide.multiplier}×${i}`;
            rodCol.appendChild(botLabel);
            rodsRow.appendChild(rodCol);
          }
        }
        renderRods(sliderValue);
        sliderContainer.appendChild(rodsRow);

        // Slider UI
        const sliderWrap = document.createElement("div");
        sliderWrap.style.display = "flex";
        sliderWrap.style.flexDirection = "column";
        sliderWrap.style.alignItems = "center";
        sliderWrap.style.marginTop = "30px";
        sliderWrap.style.background = "rgba(255,255,255,0.08)";
        sliderWrap.style.borderRadius = "16px";
        sliderWrap.style.padding = "24px 32px 16px 32px";
        // Slider label
        const sliderLabel = document.createElement("div");
        sliderLabel.style.fontSize = "32px";
        sliderLabel.style.fontWeight = "bold";
        sliderLabel.style.marginBottom = "10px";
        sliderLabel.innerText = slide.text;
        sliderWrap.appendChild(sliderLabel);
        // Slider bar
        const sliderBar = document.createElement("input");
        sliderBar.type = "range";
        sliderBar.min = 1;
        sliderBar.max = slide.max;
        sliderBar.value = sliderValue;
        sliderBar.style.width = "520px";
        sliderBar.style.margin = "0 0 10px 0";
        sliderBar.step = 1;
        sliderBar.style.accentColor = "#ffd700";
        sliderBar.style.height = "8px";
        sliderWrap.appendChild(sliderBar);
        // Slider ticks
        const ticks = document.createElement("div");
        ticks.style.display = "flex";
        ticks.style.justifyContent = "space-between";
        ticks.style.width = "520px";
        ticks.style.marginTop = "-8px";
        for (let i = 0; i <= slide.max; i++) {
          const tick = document.createElement("div");
          tick.style.textAlign = "center";
          tick.style.width = "32px";
          tick.style.color = "white";
          tick.style.fontSize = "28px";
          tick.style.opacity = i === sliderValue ? "1" : "0.5";
          tick.innerText = i;
          ticks.appendChild(tick);
        }
        sliderWrap.appendChild(ticks);
        sliderContainer.appendChild(sliderWrap);

        // Update rods, equation, and ticks on slider change
        sliderBar.addEventListener("input", (e) => {
          sliderValue = parseInt(sliderBar.value);
          renderRods(sliderValue);
          equation.innerHTML = `${slide.multiplier} × <span class=\"highlight\">${sliderValue}</span> = ${slide.multiplier * sliderValue}`;
          // Update tick highlight
          Array.from(ticks.children).forEach((tick, idx) => {
            tick.style.opacity = idx === sliderValue ? "1" : "0.5";
          });
        });

        // Only append right panel for this slide
        slideDiv.appendChild(right);
        right.appendChild(sliderContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        return;
      }


      if (slide.type === "slider-result") {
        // --- SLIDER SLIDE DESIGN ---
        // No left panel for this slide
        const right = document.createElement("div");
        right.className = "right-panel";
        right.style.flex = "1 1 100%";
        right.style.margin = "0 auto";
        right.style.width = "100%";
        right.style.height = "100%";
        right.style.background = "none";

        const sliderContainer = document.createElement("div");
        sliderContainer.style.width = "100%";
        sliderContainer.style.display = "flex";
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.alignItems = "center";
        sliderContainer.style.justifyContent = "center";
        sliderContainer.style.gap = "30px";
        sliderContainer.style.background = "rgba(0,0,0,0.15)";
        sliderContainer.style.borderRadius = "20px";
        sliderContainer.style.padding = "40px 0";

        // Title at the top
        const title = document.createElement("div");
        title.style.fontSize = "44px";
        title.style.fontWeight = "bold";
        title.style.color = "white";
        title.style.textAlign = "center";
        title.style.marginBottom = "30px";
        title.innerText = slide.text || "These lengths are all formed by joining rods of 2…";
        sliderContainer.appendChild(title);

        // Rods row (always show all rods, no slider)
        const rodsRow = document.createElement("div");
        rodsRow.style.display = "flex";
        rodsRow.style.alignItems = "flex-end";
        rodsRow.style.gap = "18px";
        rodsRow.style.marginBottom = "0px";
        rodsRow.style.marginTop = "10px";
        rodsRow.style.width = "100%";
        rodsRow.style.justifyContent = "center";

        // Top labels
        for (let i = 1; i <= 10; i++) {
          const rodCol = document.createElement("div");
          rodCol.style.display = "flex";
          rodCol.style.flexDirection = "column";
          rodCol.style.alignItems = "center";
          rodCol.style.position = "relative";
          rodCol.style.minWidth = "70px";

          // Top label
          const topLabel = document.createElement("div");
          topLabel.style.color = "white";
          topLabel.style.fontSize = "32px";
          topLabel.style.fontWeight = "bold";
          topLabel.style.marginBottom = "8px";
          topLabel.innerText = slide.multiplier * i;
          rodCol.appendChild(topLabel);

          // Rod block (long rectangle)
          const rodBlock = document.createElement("div");
          rodBlock.style.width = "60px";
          rodBlock.style.height = "60px";
          rodBlock.style.borderRadius = "14px";
          rodBlock.style.background = "white";
          rodBlock.style.border = "4px solid #2366cc";
          rodBlock.style.display = "flex";
          rodBlock.style.justifyContent = "center";
          rodBlock.style.alignItems = "center";
          rodBlock.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
          rodBlock.style.margin = "0";
          rodCol.appendChild(rodBlock);

          // Bottom label
          const botLabel = document.createElement("div");
          botLabel.style.color = "white";
          botLabel.style.fontSize = "26px";
          botLabel.style.fontWeight = "bold";
          botLabel.style.marginTop = "8px";
          botLabel.innerText = `${slide.multiplier}×${i}`;
          rodCol.appendChild(botLabel);

          rodsRow.appendChild(rodCol);
        }
        sliderContainer.appendChild(rodsRow);

        // Add a row of numbers above the rods (for spacing, optional)
        // Add a row of numbers at the end (for 20 at the rightmost)
        const lastNum = document.createElement("div");
        lastNum.style.position = "absolute";
        lastNum.style.right = "60px";
        lastNum.style.top = "120px";
        lastNum.style.color = "white";
        lastNum.style.fontSize = "32px";
        lastNum.style.fontWeight = "bold";
        lastNum.innerText = slide.multiplier * 10;
        // Not strictly needed, as the last rodCol already has the number

        // Only append right panel for this slide
        slideDiv.appendChild(right);
        right.appendChild(sliderContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        return;
      }


      if (slide.type === "multiples-summary") {
        // --- MULTIPLES SUMMARY SLIDE ---
        const right = document.createElement("div");
        right.className = "right-panel";
        right.style.flex = "1 1 100%";
        right.style.margin = "0 auto";
        right.style.width = "100%";
        right.style.height = "100%";
        right.style.background = "none";
        right.style.position = "relative";

        const summaryContainer = document.createElement("div");
        summaryContainer.style.width = "100%";
        summaryContainer.style.display = "flex";
        summaryContainer.style.flexDirection = "column";
        summaryContainer.style.alignItems = "center";
        summaryContainer.style.justifyContent = "center";
        summaryContainer.style.gap = "30px";
        summaryContainer.style.background = "rgba(0,0,0,0.15)";
        summaryContainer.style.borderRadius = "20px";
        summaryContainer.style.padding = "40px 0 0 0";

        // Title at the top
        const title = document.createElement("div");
        title.style.fontSize = "44px";
        title.style.fontWeight = "bold";
        title.style.color = "white";
        title.style.textAlign = "center";
        title.style.marginBottom = "10px";
        title.innerText = "MULTIPLES of 2";
        summaryContainer.appendChild(title);

        // Subtitle
        const subtitle = document.createElement("div");
        subtitle.style.fontSize = "32px";
        subtitle.style.fontWeight = "bold";
        subtitle.style.color = "white";
        subtitle.style.textAlign = "center";
        subtitle.style.marginBottom = "30px";
        subtitle.innerHTML = "are all numbers that can be made up of 2<br>multiplied by a natural number";
        summaryContainer.appendChild(subtitle);

        // Row of numbers and equations
        const numbersRow = document.createElement("div");
        numbersRow.style.display = "flex";
        numbersRow.style.justifyContent = "center";
        numbersRow.style.alignItems = "flex-end";
        numbersRow.style.gap = "38px";
        numbersRow.style.marginBottom = "0px";
        numbersRow.style.marginTop = "10px";
        numbersRow.style.width = "100%";

        for (let i = 1; i <= 10; i++) {
          const col = document.createElement("div");
          col.style.display = "flex";
          col.style.flexDirection = "column";
          col.style.alignItems = "center";
          col.style.position = "relative";
          col.style.minWidth = "70px";

          // Top label (number)
          const topLabel = document.createElement("div");
          topLabel.style.color = "white";
          topLabel.style.fontSize = "32px";
          topLabel.style.fontWeight = "bold";
          topLabel.style.marginBottom = "8px";
          topLabel.innerText = 2 * i;
          col.appendChild(topLabel);

          // Bottom label (equation)
          const botLabel = document.createElement("div");
          botLabel.style.color = "white";
          botLabel.style.fontSize = "26px";
          botLabel.style.fontWeight = "bold";
          botLabel.style.marginTop = "8px";
          botLabel.innerText = `2×${i}`;
          col.appendChild(botLabel);

          numbersRow.appendChild(col);
        }
        summaryContainer.appendChild(numbersRow);

        // Character image at bottom right, replacing Next button
        const characterImg = document.createElement("img");
        characterImg.src = "assets/character4.png";
        characterImg.alt = "character";
        characterImg.style.position = "absolute";
        characterImg.style.right = "40px";
        characterImg.style.bottom = "0px";
        characterImg.style.height = "260px";
        characterImg.style.zIndex = "2";
        right.appendChild(characterImg);

        // Only append right panel for this slide
        slideDiv.appendChild(right);
        right.appendChild(summaryContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        // Hide the Next button for this slide
        document.getElementById("nextBtn").style.visibility = "hidden";
        return;
      }


      const left = document.createElement("div");
      left.className = "left-panel";
      left.innerHTML = `<div>${slide.text}</div><img class="character" src="${slide.character}" alt="character" />`;

      const right = document.createElement("div");
      right.className = "right-panel";

      if (slide.type === "interactive") {
        clickedBlocks = [];
        slide.blocks.forEach((block, idx) => {
          const div = document.createElement("div");
          div.className = "unit-block";
          div.style.left = block.x + "px";
          div.style.top = block.y + "px";
          div.dataset.index = idx;

          const label = document.createElement("div");
          label.className = "unit-label";
          label.innerText = block.label;
          div.appendChild(label);

          div.addEventListener("click", () => {
            if (!clickedBlocks.includes(idx)) {
              div.classList.add("highlighted");
              clickedBlocks.push(idx);
              
              if (clickedBlocks.length === 1) {
                // Change character when both blocks are clicked
                const characterImg = document.querySelector('.character');
                if (characterImg && slide.characterAfterClick) {
                  characterImg.src = slide.characterAfterClick;
                }
              }
              
              if (clickedBlocks.length === 2) {
                // All blocks clicked, proceed to next slide
                setTimeout(() => {
                  nextSlide();
                }, 800);
              }
            }
          });

          right.appendChild(div);
        });
      } else if (slide.type === "result") {
        const resultContainer = document.createElement("div");
        resultContainer.className = "rod-result";
        
        const valueDiv = document.createElement("div");
        valueDiv.className = "result-text";
        valueDiv.innerText = slide.rodValue;
        
        const rod = document.createElement("div");
        rod.className = "rod";
        for (let i = 0; i < slide.rodValue; i++) {
          const block = document.createElement("div");
          block.className = "unit-block";
          rod.appendChild(block);
        }
        
        const equation = document.createElement("div");
        equation.className = "equation";
        equation.innerHTML = `${slide.rodValue} × <span class="highlight">1</span> = ${slide.rodValue}`;
        
        resultContainer.appendChild(valueDiv);
        resultContainer.appendChild(rod);
        resultContainer.appendChild(equation);
        right.appendChild(resultContainer);
      }

      slideDiv.appendChild(left);
      slideDiv.appendChild(right);
      container.appendChild(slideDiv);
      updateProgress();
      updateNavigation();
    }



    function updateProgress() {
      const dots = document.getElementById("progress-dots");
      dots.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === currentSlide) dot.classList.add("active");
        dots.appendChild(dot);
      });
    }

    function updateNavigation() {
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === slides.length - 1;
    }

    function nextSlide() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      }
    }

    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      }
    }

    document.getElementById("nextBtn").addEventListener("click", nextSlide);
    document.getElementById("prevBtn").addEventListener("click", prevSlide);

    // Initialize
    renderSlide(currentSlide);
