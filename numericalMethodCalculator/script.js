document.getElementById("bisection-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const funcInput = document.getElementById("function").value;
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const absErrorChecked = document.getElementById("abs-error").checked;
    const relErrorChecked = document.getElementById("rel-error").checked;
    const displayFunction = document.getElementById("display-function");
    const iterationsDisplay = document.getElementById("iterations");
  
    iterationsDisplay.innerHTML = "";
    displayFunction.innerHTML = `\\( f(x) = ${funcInput.replace(/\^/g, "^")} \\)`;
    MathJax.typeset();
  
    try {
      const expr = math.parse(funcInput.replace(/\^/g, "**"));
      const compiled = expr.compile();
  
      const f = (x) => {
        return compiled.evaluate({ x: x });
      };
  
      let a, b;
      if (mode === "between") {
        a = parseFloat(document.getElementById("input-a").value);
        b = parseFloat(document.getElementById("input-b").value);
  
        if (f(a) * f(b) >= 0) {
          iterationsDisplay.innerHTML =
            "⚠️ No sign change found in range. Try different bounds.";
          return;
        }
      } else {
        // Auto mode — scan for sign change
        let found = false;
        for (let i = -100; i < 100; i++) {
          if (f(i) * f(i + 1) < 0) {
            a = i;
            b = i + 1;
            found = true;
            break;
          }
        }
        if (!found) {
          iterationsDisplay.innerHTML =
            "⚠️ No sign change found in default range. Try 'between two points'.";
          return;
        }
      }
  
      const tol = 1e-6;
      const maxIter = 100;
      let mid, prevMid = null;
      const iterations = [];
  
      for (let i = 1; i <= maxIter; i++) {
        mid = (a + b) / 2;
        const fmid = f(mid);
        const fa = f(a);
  
        let absError = null, relError = null;
  
        if (prevMid !== null) {
          absError = Math.abs(mid - prevMid);
          relError = Math.abs((mid - prevMid) / mid) * 100;
        }
  
        iterations.push({
          iteration: i,
          a, b,
          mid,
          fmid,
          absError,
          relError
        });
  
        if (Math.abs(fmid) < tol) break;
  
        if (fa * fmid < 0) b = mid;
        else a = mid;
  
        prevMid = mid;
      }
  
      iterations.forEach(it => {
        const div = document.createElement("div");
        div.className = "iteration-box";
  
        const explanation = it.fmid * f(it.a) < 0
          ? "f(a) and f(mid) have opposite signs, so root lies in [a, mid]"
          : "f(mid) and f(b) have opposite signs, so root lies in [mid, b]";
  
        let latex = `\\( \\text{Iteration ${it.iteration}}:\\quad a = ${it.a.toFixed(6)},\\; b = ${it.b.toFixed(6)},\\; m = \\frac{a + b}{2} = ${it.mid.toFixed(6)} \\)`;
        latex += `\\\\ \\( f(m) = ${it.fmid.toExponential(6)} \\)`;
  
        if (absErrorChecked && it.absError !== null)
          latex += `\\\\ \\( \\text{Absolute Error} = ${it.absError.toExponential(6)} \\)`;
  
        if (relErrorChecked && it.relError !== null)
          latex += `\\\\ \\( \\text{Relative Error} = ${it.relError.toFixed(6)}\\% \\)`;
  
        div.innerHTML = `
          <div>${latex}</div>
          <div><em>Step:</em> ${explanation}</div>
        `;
  
        iterationsDisplay.appendChild(div);
      });
  
      // Final Answer
      const final = iterations[iterations.length - 1];
      const finalBox = document.createElement("div");
      finalBox.className = "iteration-box";
      finalBox.innerHTML = `
        <h3>✅ Final Answer</h3>
        \\( x = ${final.mid.toFixed(6)} \\), \\( f(x) = ${final.fmid.toExponential(6)} \\)<br/>
        ${absErrorChecked && final.absError !== null ? `\\( \\text{Absolute Error} = ${final.absError.toExponential(6)} \\)<br/>` : ""}
        ${relErrorChecked && final.relError !== null ? `\\( \\text{Relative Error} = ${final.relError.toFixed(6)}\\% \\)<br/>` : ""}
      `;
      iterationsDisplay.appendChild(finalBox);
  
      MathJax.typeset();
    } catch (err) {
      iterationsDisplay.innerHTML = `❌ Error: ${err.message}`;
    }
  });
  