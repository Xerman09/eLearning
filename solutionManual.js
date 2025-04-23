

const solutionManualArray = [
    {
      link: "./library/index.html?subject=differentialEquation",
      subjectTitle: "Differential Equation by Rainvalle",
    },
    ];
  
    function renderSolutionManualContent() {
      const container = document.getElementById('render-sol-manual');
  
      // Loop through the content array
      for (let i = 0; i < solutionManualArray.length; i++) {
          // Create an HTML block dynamically
          let htmlBlock = `
            <div class="w3-quarter ">
                <a href="${solutionManualArray[i].link}">
                  <div class="w3-container bgclr-darkblue w3-padding-16  mrt-20">
                    <div class="w3-left"></div>
                      <div class="w3-right">
                      </div>
                    <div class="w3-clear"></div>
                    <h4 style="text-align: center;">${solutionManualArray[i].subjectTitle}</h4>
                  </div>
                </a>
            </div>
          `;
  
          // Insert the HTML block into the container
          container.innerHTML += htmlBlock;
      }
  }
  
  
  renderSolutionManualContent();

