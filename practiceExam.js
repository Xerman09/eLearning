

const practiceExamArray = [
  {
    link: "./library/practiceExam.html?subject=cse_question&topic=0",
    subjectTitle: "Civil Service Exam",
  },
  ];

  function practiceExam() {
    const container = document.getElementById('render-practice-exam');

    // Loop through the content array
    for (let i = 0; i < practiceExamArray.length; i++) {
        // Create an HTML block dynamically
        let htmlBlock = `
          <div class="w3-quarter ">
              <a href="${practiceExamArray[i].link}">
                <div class="w3-container bgclr-darkblue w3-padding-16  mrt-20">
                  <div class="w3-left"></div>
                    <div class="w3-right">
                    </div>
                  <div class="w3-clear"></div>
                  <h4 style="text-align: center;">${practiceExamArray[i].subjectTitle}</h4>
                </div>
              </a>
          </div>
        `;

        // Insert the HTML block into the container
        container.innerHTML += htmlBlock;
    }
}


practiceExam();
