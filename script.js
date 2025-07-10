const slides = [
      {
        type: "interactive",
        text: "TAP on the UNIT SQUARES to bring them together.<br><br>What would this make?",
        character: "assets/character1.png",
        characterAfterClick: "assets/character2.png",
        blocks: [
          { x: 180, y: 80, label: 1 },
          { x: 380, y: 280, label: 1 }
          { x: 180, y: 80, label: 1 },
          { x: 380, y: 280, label: 1 }
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
          { x: 180, y: 80, label: 2 },
          { x: 380, y: 280, label: 2 }
          { x: 180, y: 80, label: 2 },
          { x: 380, y: 280, label: 2 }
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
        multiplier: 2,
        max: 10
      },
      {
        type: "slider-result",
        text: "These lengths are all formed by joining rods of 2…",
        multiplier: 2,
        max: 10
      },
      {
        type: "slider-result",
        text: "These lengths are all formed by joining rods of 2…",
        subtitle: "These numbers are called MULTIPLES of 2…",
        multiplier: 2,
        max: 10
      },
      {
        type: "multiples-summary",
        text: "MULTIPLES of 2",
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
        document.getElementById("nextBtn").classList.remove("next-highlighted");
        document.getElementById("nextBtn").classList.remove("next-highlighted");
      }

      const slideDiv = document.createElement("div");
      slideDiv.className = "slide";

      if (slide.type === "slider") {
        // Full width slider slide
        // Full width slider slide
        const sliderContainer = document.createElement("div");
        sliderContainer.className = "right-panel slider-panel";
        sliderContainer.style.flex = "1 1 100%";
        sliderContainer.style.margin = "0";
        sliderContainer.className = "right-panel slider-panel";
        sliderContainer.style.flex = "1 1 100%";
        sliderContainer.style.margin = "0";
        sliderContainer.style.width = "100%";

        const content = document.createElement("div");
        content.className = "slider-container-compact";

        const content = document.createElement("div");
        content.className = "slider-container-compact";

        // Equation at the top
        const equation = document.createElement("div");
        equation.className = "equation";
        let sliderValue = 0; // Start at 0
        equation.innerHTML = sliderValue === 0 ? "" : `2 × <span class="highlight">${sliderValue}</span> = ${2 * sliderValue}`;
        content.appendChild(equation);

        // Rods row
        const rodsRow = document.createElement("div");
        rodsRow.className = "slider-rod-row";
        
        
        function renderRods(val) {
          rodsRow.innerHTML = "";
          if (val === 0) return; // Show nothing for 0
          for (let i = 1; i <= val; i++) {
            const rodCol = document.createElement("div");
            
            // Top label (result number)
            
            // Top label (result number)
            const topLabel = document.createElement("div");
            topLabel.innerText = 2 * i;
            topLabel.innerText = 2 * i;
            rodCol.appendChild(topLabel);
            
            // Rod blocks
            const rodBlock = document.createElement("div");
            rodBlock.style.display = "flex";
            rodBlock.style.gap = "6px";
            for (let j = 0; j < 2; j++) {
              const block = document.createElement("div");
              block.style.width = "48px";
              block.style.height = "48px";
              block.style.borderRadius = "12px";
              block.style.background = "white";
              block.style.border = "4px solid #2366cc";
              block.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
              rodBlock.appendChild(block);
            }
            rodCol.appendChild(rodBlock);
            
            // Bottom label (equation)
            
            // Rod blocks
            const rodBlock = document.createElement("div");
            rodBlock.style.display = "flex";
            rodBlock.style.gap = "6px";
            for (let j = 0; j < 2; j++) {
              const block = document.createElement("div");
              block.style.width = "48px";
              block.style.height = "48px";
              block.style.borderRadius = "12px";
              block.style.background = "white";
              block.style.border = "4px solid #2366cc";
              block.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
              rodBlock.appendChild(block);
            }
            rodCol.appendChild(rodBlock);
            
            // Bottom label (equation)
            const botLabel = document.createElement("div");
            botLabel.innerText = `2×${i}`;
            botLabel.innerText = `2×${i}`;
            rodCol.appendChild(botLabel);
            
            
            rodsRow.appendChild(rodCol);
          }
        }
        renderRods(sliderValue);
        content.appendChild(rodsRow);
        content.appendChild(rodsRow);

        // Slider controls
        // Slider controls
        const sliderWrap = document.createElement("div");
        sliderWrap.className = "slider-bar-wrap";
        
        
        // Slider label
        const sliderLabel = document.createElement("div");
        sliderLabel.innerText = slide.text;
        sliderWrap.appendChild(sliderLabel);
        
        
        // Slider bar
        const sliderBar = document.createElement("input");
        sliderBar.type = "range";
        sliderBar.min = 0; // Set min to 0
        sliderBar.max = slide.max;
        sliderBar.value = sliderValue;
        sliderBar.step = 1;
        sliderWrap.appendChild(sliderBar);
        
        
        // Slider ticks
        const ticks = document.createElement("div");
        ticks.className = "slider-ticks";
        for (let i = 0; i <= slide.max; i++) {
          const tickWrapper = document.createElement("div");
          
          // Circle dot
          const tickDot = document.createElement("div");
          tickDot.style.opacity = i === sliderValue ? "1" : "0.5";
          tickDot.style.transform = i === sliderValue ? "scale(1.2)" : "scale(1)";
          tickWrapper.appendChild(tickDot);
          
          // Number below
          const tickLabel = document.createElement("div");
          tickLabel.innerText = i;
          tickLabel.style.opacity = i === sliderValue ? "1" : "0.5";
          tickWrapper.appendChild(tickLabel);
          
          ticks.appendChild(tickWrapper);
          
          // Circle dot
          const tickDot = document.createElement("div");
          tickDot.style.opacity = i === sliderValue ? "1" : "0.5";
          tickDot.style.transform = i === sliderValue ? "scale(1.2)" : "scale(1)";
          tickWrapper.appendChild(tickDot);
          
          // Number below
          const tickLabel = document.createElement("div");
          tickLabel.innerText = i;
          tickLabel.style.opacity = i === sliderValue ? "1" : "0.5";
          tickWrapper.appendChild(tickLabel);
          
          ticks.appendChild(tickWrapper);
        }
        sliderWrap.appendChild(ticks);
        content.appendChild(sliderWrap);
        content.appendChild(sliderWrap);

        // Update on slider change
        // Update on slider change
        sliderBar.addEventListener("input", (e) => {
          sliderValue = parseInt(sliderBar.value);
          renderRods(sliderValue);
          equation.innerHTML = sliderValue === 0 ? "" : `2 × <span class="highlight">${sliderValue}</span> = ${2 * sliderValue}`;
          
          // Update tick highlight
          Array.from(ticks.children).forEach((tick, idx) => {
            const dot = tick.children[0];
            const label = tick.children[1];
            const isActive = idx === sliderValue;
            dot.style.opacity = isActive ? "1" : "0.5";
            label.style.opacity = isActive ? "1" : "0.5";
            dot.style.transform = isActive ? "scale(1.2)" : "scale(1)";
            const dot = tick.children[0];
            const label = tick.children[1];
            const isActive = idx === sliderValue;
            dot.style.opacity = isActive ? "1" : "0.5";
            label.style.opacity = isActive ? "1" : "0.5";
            dot.style.transform = isActive ? "scale(1.2)" : "scale(1)";
          });
        });

        sliderContainer.appendChild(content);
        slideDiv.appendChild(sliderContainer);
        sliderContainer.appendChild(content);
        slideDiv.appendChild(sliderContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        return;
      }

      if (slide.type === "slider-result") {
        // Full width result slide
        const resultContainer = document.createElement("div");
        resultContainer.className = "slider-result-container";
        resultContainer.style.flex = "1 1 100%";
        resultContainer.style.margin = "0";
        resultContainer.style.width = "100%";
        // Full width result slide
        const resultContainer = document.createElement("div");
        resultContainer.className = "slider-result-container";
        resultContainer.style.flex = "1 1 100%";
        resultContainer.style.margin = "0";
        resultContainer.style.width = "100%";

        // Main title
        const title = document.createElement("div");
        title.className = "slider-result-title";
        title.innerText = slide.text || "These lengths are all formed by joining rods of 2…";
        resultContainer.appendChild(title);
        // Main title
        const title = document.createElement("div");
        title.className = "slider-result-title";
        title.innerText = slide.text || "These lengths are all formed by joining rods of 2…";
        resultContainer.appendChild(title);

        // Subtitle if exists
        if (slide.subtitle) {
          const subtitle = document.createElement("div");
          subtitle.className = "slider-result-subtitle";
          subtitle.innerText = slide.subtitle;
          resultContainer.appendChild(subtitle);
        }
        // Subtitle if exists
        if (slide.subtitle) {
          const subtitle = document.createElement("div");
          subtitle.className = "slider-result-subtitle";
          subtitle.innerText = slide.subtitle;
          resultContainer.appendChild(subtitle);
        }

        // Rods display
        const rodsContainer = document.createElement("div");
        rodsContainer.className = "slider-result-rods";
        // Rods display
        const rodsContainer = document.createElement("div");
        rodsContainer.className = "slider-result-rods";

        for (let i = 1; i <= 10; i++) {
          const rodCol = document.createElement("div");
          rodCol.className = "slider-result-rod";
        for (let i = 1; i <= 10; i++) {
          const rodCol = document.createElement("div");
          rodCol.className = "slider-result-rod";

          // Top value
          const topLabel = document.createElement("div");
          topLabel.className = "slider-result-rod-value";
          topLabel.innerText = 2 * i;
          rodCol.appendChild(topLabel);
          // Top value
          const topLabel = document.createElement("div");
          topLabel.className = "slider-result-rod-value";
          topLabel.innerText = 2 * i;
          rodCol.appendChild(topLabel);

          // Rod blocks
          const rodBlocks = document.createElement("div");
          rodBlocks.className = "slider-result-rod-blocks";
          for (let j = 0; j < 2; j++) {
            const block = document.createElement("div");
            block.className = "slider-result-rod-block";
            rodBlocks.appendChild(block);
          }
          rodCol.appendChild(rodBlocks);
          // Rod blocks
          const rodBlocks = document.createElement("div");
          rodBlocks.className = "slider-result-rod-blocks";
          for (let j = 0; j < 2; j++) {
            const block = document.createElement("div");
            block.className = "slider-result-rod-block";
            rodBlocks.appendChild(block);
          }
          rodCol.appendChild(rodBlocks);

          // Bottom equation
          const botLabel = document.createElement("div");
          botLabel.className = "slider-result-rod-equation";
          botLabel.innerText = `2 × ${i}`;
          rodCol.appendChild(botLabel);
          // Bottom equation
          const botLabel = document.createElement("div");
          botLabel.className = "slider-result-rod-equation";
          botLabel.innerText = `2 × ${i}`;
          rodCol.appendChild(botLabel);

          rodsContainer.appendChild(rodCol);
        }
          rodsContainer.appendChild(rodCol);
        }

        resultContainer.appendChild(rodsContainer);
        slideDiv.appendChild(resultContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        
        // Highlight Next button
        document.getElementById("nextBtn").classList.add("next-highlighted");
        return;
      }
        resultContainer.appendChild(rodsContainer);
        slideDiv.appendChild(resultContainer);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        
        // Highlight Next button
        document.getElementById("nextBtn").classList.add("next-highlighted");
        return;
      }

      if (slide.type === "multiples-summary") {
        // Full width summary slide
        // Full width summary slide
        const bg = document.createElement("div");
        bg.className = "multiples-summary-bg";
        bg.style.flex = "1 1 100%";
        bg.style.margin = "0";
        bg.style.width = "100%";
        bg.style.flex = "1 1 100%";
        bg.style.margin = "0";
        bg.style.width = "100%";

        // Title
        const title = document.createElement("div");
        title.className = "summary-title";
        title.innerText = "MULTIPLES of 2";
        bg.appendChild(title);

        // Subtitle
        const subtitle = document.createElement("div");
        subtitle.className = "summary-subtitle";
        subtitle.innerText = "are all numbers that can be made up of 2\nmultiplied by a natural number";
        bg.appendChild(subtitle);

        // Row of numbers and equations
        const numbersRow = document.createElement("div");
        numbersRow.className = "summary-row";
        for (let i = 1; i <= 10; i++) {
          const col = document.createElement("div");
          col.className = "summary-col";
          
          // Top number
          
          // Top number
          const topLabel = document.createElement("div");
          topLabel.className = "summary-number";
          topLabel.innerText = 2 * i;
          col.appendChild(topLabel);
          
          // Bottom equation
          
          // Bottom equation
          const botLabel = document.createElement("div");
          botLabel.className = "summary-eq";
          botLabel.innerText = `2×${i}`;
          col.appendChild(botLabel);
          
          
          numbersRow.appendChild(col);
        }
        bg.appendChild(numbersRow);

        // Character image
        // Character image
        const characterImg = document.createElement("img");
        characterImg.src = "assets/character4.png";
        characterImg.alt = "character";
        bg.appendChild(characterImg);

        slideDiv.appendChild(bg);
        container.appendChild(slideDiv);
        updateProgress();
        updateNavigation();
        
        // Hide Next button for final slide
        
        // Hide Next button for final slide
        document.getElementById("nextBtn").style.visibility = "hidden";
        return;
      }

      // Regular slides with left and right panels
      // Regular slides with left and right panels
      const left = document.createElement("div");
      left.className = "left-panel";
      left.innerHTML = `<div>${slide.text}</div><img class="character" src="${slide.character}" alt="character" />`;

      const right = document.createElement("div");
      right.className = "right-panel";

      if (slide.type === "interactive") {
        clickedBlocks = [];
        slide.blocks.forEach((block, idx) => {
          let div;
          if (block.label === 2) {
            // Render a rod (2 connected unit blocks)
            div = document.createElement("div");
            div.className = "rod interactive-rod";
            div.style.position = "absolute";
            div.style.left = block.x + "px";
            div.style.top = block.y + "px";
            div.dataset.index = idx;
            // Add label above rod
            const label = document.createElement("div");
            label.className = "unit-label";
            label.innerText = block.label;
            label.style.textAlign = "center";
            label.style.marginBottom = "2px";
            div.appendChild(label);
            // Add two unit blocks inside the rod
            const rodBlocks = document.createElement("div");
            rodBlocks.style.display = "flex";
            rodBlocks.style.gap = "6px";
            for (let j = 0; j < 2; j++) {
              const blockDiv = document.createElement("div");
              blockDiv.className = "unit-block";
              rodBlocks.appendChild(blockDiv);
            }
            div.appendChild(rodBlocks);
          } else {
            // Default: single unit block
            div = document.createElement("div");
            div.className = "unit-block";
            div.style.left = block.x + "px";
            div.style.top = block.y + "px";
            div.dataset.index = idx;
            const label = document.createElement("div");
            label.className = "unit-label";
            label.innerText = block.label;
            div.appendChild(label);
          }
          div.addEventListener("click", () => {
            if (!clickedBlocks.includes(idx)) {
              div.classList.add("highlighted");
              clickedBlocks.push(idx);
              
              if (clickedBlocks.length === 1) {
                // Change character when first block is clicked
                // Change character when first block is clicked
                const characterImg = document.querySelector('.character');
                if (characterImg && slide.characterAfterClick) {
                  characterImg.src = slide.characterAfterClick;
                }
              }
              
              if (clickedBlocks.length === slide.blocks.length) {
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

        // Set green background for result panels
        left.classList.add("result-left-panel");
        right.classList.add("result-right-panel");

        // Special case: if rodValue is 4 and previous slide was joining two 2-unit rods, show two rods of 2
        if (slide.rodValue === 4 && slides[index - 1] && slides[index - 1].type === "interactive" && slides[index - 1].blocks && slides[index - 1].blocks[0].label === 2) {
          // Show two rods of 2 blocks each, each with a '2' label above
          for (let i = 0; i < 2; i++) {
            const rodGroup = document.createElement("div");
            rodGroup.style.display = "flex";
            rodGroup.style.flexDirection = "column";
            rodGroup.style.alignItems = "center";
            rodGroup.style.margin = "0 24px";

            const valueDiv = document.createElement("div");
            valueDiv.className = "result-text";
            valueDiv.innerText = "2";
            rodGroup.appendChild(valueDiv);

            const rod = document.createElement("div");
            rod.className = "rod";
            for (let j = 0; j < 2; j++) {
              const block = document.createElement("div");
              block.className = "unit-block result-block";
              rod.appendChild(block);
            }
            rodGroup.appendChild(rod);
            right.appendChild(rodGroup);
          }
          // Optionally, add the equation below both rods
          const equation = document.createElement("div");
          equation.className = "equation";
          equation.innerHTML = `2 × 2 = 4`;
          right.appendChild(equation);
        } else {
          // Default: single rod of rodValue blocks
          const valueDiv = document.createElement("div");
          valueDiv.className = "result-text";
          valueDiv.innerText = slide.rodValue;
          const rod = document.createElement("div");
          rod.className = "rod";
          for (let i = 0; i < slide.rodValue; i++) {
            const block = document.createElement("div");
            block.className = "unit-block result-block";
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

        // Highlight Next button for result slides
        document.getElementById("nextBtn").classList.add("next-highlighted");
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